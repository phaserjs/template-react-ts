import type { Config } from "stylelint";

export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
  },
} satisfies Config;
