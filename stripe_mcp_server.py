#!/usr/bin/env python3
"""
Stripe MCP Server for Gamefluence - JSON-RPC 2.0 compliant
"""

import json
import sys
from typing import Dict, Any

def create_test_customer(name: str, email: str) -> Dict[str, Any]:
    return {
        "id": f"cus_test_{abs(hash(email)) % 10000:04d}",
        "name": name,
        "email": email,
        "created": 1640995200,
        "currency": "usd",
        "balance": 0
    }

def create_test_product(name: str, description: str = "") -> Dict[str, Any]:
    return {
        "id": f"prod_test_{abs(hash(name)) % 10000:04d}",
        "name": name,
        "description": description,
        "active": True,
        "created": 1640995200,
        "type": "service"
    }

def create_test_price(product_id: str, amount: int, currency: str = "usd") -> Dict[str, Any]:
    return {
        "id": f"price_test_{abs(hash(product_id)) % 10000:04d}",
        "product": product_id,
        "unit_amount": amount,
        "currency": currency,
        "active": True,
        "created": 1640995200
    }

def simulate_payment(customer_id: str, amount: int, currency: str = "usd") -> Dict[str, Any]:
    return {
        "id": f"pi_test_{abs(hash(customer_id)) % 10000:04d}",
        "amount": amount,
        "currency": currency,
        "customer": customer_id,
        "status": "succeeded",
        "created": 1640995200
    }

TOOLS = [
    {
        "name": "create_test_customer",
        "description": "Create a test Stripe customer",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Customer name"},
                "email": {"type": "string", "description": "Customer email"}
            },
            "required": ["name", "email"]
        }
    },
    {
        "name": "create_test_product",
        "description": "Create a test Stripe product",
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Product name"},
                "description": {"type": "string", "description": "Product description"}
            },
            "required": ["name"]
        }
    },
    {
        "name": "simulate_payment",
        "description": "Simulate a Stripe payment intent",
        "inputSchema": {
            "type": "object",
            "properties": {
                "customer_id": {"type": "string", "description": "Stripe customer ID"},
                "amount": {"type": "integer", "description": "Amount in cents"},
                "currency": {"type": "string", "description": "Currency code (default: usd)"}
            },
            "required": ["customer_id", "amount"]
        }
    }
]

def handle_request(request: Dict[str, Any]) -> Dict[str, Any]:
    req_id = request.get("id")
    method = request.get("method", "")
    params = request.get("params", {})

    def ok(result):
        return {"jsonrpc": "2.0", "id": req_id, "result": result}

    def err(code, message):
        return {"jsonrpc": "2.0", "id": req_id, "error": {"code": code, "message": message}}

    if method == "initialize":
        return ok({
            "protocolVersion": "2024-11-05",
            "capabilities": {"tools": {}},
            "serverInfo": {"name": "stripe-test", "version": "1.0.0"}
        })

    if method == "notifications/initialized":
        return None  # no response for notifications

    if method == "tools/list":
        return ok({"tools": TOOLS})

    if method == "tools/call":
        tool_name = params.get("name", "")
        arguments = params.get("arguments", {})

        try:
            if tool_name == "create_test_customer":
                result = create_test_customer(arguments["name"], arguments["email"])
            elif tool_name == "create_test_product":
                result = create_test_product(arguments["name"], arguments.get("description", ""))
            elif tool_name == "simulate_payment":
                result = simulate_payment(
                    arguments["customer_id"],
                    arguments["amount"],
                    arguments.get("currency", "usd")
                )
            else:
                return err(-32601, f"Unknown tool: {tool_name}")

            return ok({"content": [{"type": "text", "text": json.dumps(result, indent=2)}]})
        except KeyError as e:
            return err(-32602, f"Missing required argument: {e}")
        except Exception as e:
            return err(-32603, str(e))

    return err(-32601, f"Method not found: {method}")


if __name__ == "__main__":
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            request = json.loads(line)
            response = handle_request(request)
            if response is not None:
                print(json.dumps(response), flush=True)
        except json.JSONDecodeError as e:
            print(json.dumps({
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32700, "message": f"Parse error: {e}"}
            }), flush=True)
        except Exception as e:
            print(json.dumps({
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32603, "message": str(e)}
            }), flush=True)
