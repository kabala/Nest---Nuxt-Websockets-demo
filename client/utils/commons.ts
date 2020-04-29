import { minLength, maxLength, alphaNum } from "vuelidate/lib/validators";

export const tagInputValidators = {
  minLength: minLength(3),
  maxLength: maxLength(12),
  alphaNum
};
