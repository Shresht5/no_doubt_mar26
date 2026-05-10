import razorpay
import os
import hmac
import hashlib
from src.middleware.dotenv import loadDotenv
from fastapi import APIRouter, Request, HTTPException

# ✅ Load .env BEFORE reading any env vars
loadDotenv()

router = APIRouter(prefix="/api/payment", tags=["payment"])

# ✅ Client is built AFTER loadDotenv(), so keys are available
client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID"),
    os.getenv("RAZORPAY_KEY_SECRET"),
))


@router.post("/create-order")
async def create_order(req: Request):
    data = await req.json()
    amount = data.get("amount")  # expects amount in rupees (₹) from frontend

    if not amount:
        raise HTTPException(status_code=400, detail="amount is required")

    order = client.order.create({
        "amount": int(amount) ,   # ✅ convert ₹ → paise here, send ₹ from frontend
        "currency": "INR",
        "receipt": "receipt_001",
        "payment_capture": 1,
    })

    return {
        "order_id": order["id"],
        "amount":   order["amount"],
        "currency": order["currency"],
        "key_id":   os.getenv("RAZORPAY_KEY_ID"),   # frontend needs this to init checkout
    }


@router.post("/verify-payment")
async def verify_payment(req: Request):
    body = await req.json()

    order_id   = body.get("razorpay_order_id")
    payment_id = body.get("razorpay_payment_id")
    signature  = body.get("razorpay_signature")

    if not all([order_id, payment_id, signature]):
        raise HTTPException(status_code=400, detail="Missing payment fields")

    # ✅ Correct HMAC-SHA256 signature verification
    generated = hmac.new(
        key=os.getenv("RAZORPAY_KEY_SECRET").encode("utf-8"),
        msg=f"{order_id}|{payment_id}".encode("utf-8"),
        digestmod=hashlib.sha256,
    ).hexdigest()

    # ✅ Use compare_digest to prevent timing attacks
    is_valid = hmac.compare_digest(generated, signature)

    if not is_valid:
        raise HTTPException(status_code=400, detail="Invalid payment signature")

    return {"valid": True, "payment_id": payment_id, "order_id": order_id}