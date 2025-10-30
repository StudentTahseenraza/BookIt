// backend/controllers/promoController.js
import PromoCode from '../models/PromoCode.js';

// @desc    Validate promo code
// @route   POST /api/promo/validate
// @access  Public
export const validatePromoCode = async (req, res) => {
  try {
    const { promoCode, amount } = req.body;

    if (!promoCode) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const validation = await validatePromoCodeLogic(promoCode, amount);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    res.json({
      success: true,
      data: validation
    });

  } catch (error) {
    console.error('Validate promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while validating promo code'
    });
  }
};

// Logic function for promo validation
export const validatePromoCodeLogic = async (promoCode, amount = 0) => {
  try {
    const promo = await PromoCode.findOne({ 
      code: promoCode.toUpperCase().trim(),
      isActive: true 
    });

    if (!promo) {
      return {
        isValid: false,
        message: 'Promo code not found'
      };
    }

    const now = new Date();

    // Check validity period
    if (promo.validFrom && now < promo.validFrom) {
      return {
        isValid: false,
        message: 'Promo code not yet active'
      };
    }

    if (promo.validUntil && now > promo.validUntil) {
      return {
        isValid: false,
        message: 'Promo code has expired'
      };
    }

    // Check usage limit
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return {
        isValid: false,
        message: 'Promo code usage limit reached'
      };
    }

    // Check minimum amount
    if (amount < promo.minAmount) {
      return {
        isValid: false,
        message: `Minimum amount of $${promo.minAmount} required for this promo`
      };
    }

    // Calculate discount
    let discountAmount = 0;

    if (promo.discountType === 'percentage') {
      discountAmount = (amount * promo.discountValue) / 100;
      if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }
    } else {
      discountAmount = promo.discountValue;
    }

    const finalPrice = Math.max(0, amount - discountAmount);

    return {
      isValid: true,
      discountAmount,
      discountType: promo.discountType,
      finalPrice,
      promoDetails: {
        code: promo.code,
        discountValue: promo.discountValue,
        discountType: promo.discountType
      }
    };

  } catch (error) {
    console.error('Promo validation logic error:', error);
    return {
      isValid: false,
      message: 'Error validating promo code'
    };
  }
};