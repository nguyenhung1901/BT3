import express from "express";
import {
  getOrdersByCustomer,
  createOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/customer/:customerId", getOrdersByCustomer);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);

export default router;