import { z } from "zod";

export const siteInfoSchema = z.object({
  siteArea: z
    .number({ error: "숫자를 입력하세요" })
    .positive("0보다 커야 합니다"),
  far: z
    .number({ error: "숫자를 입력하세요" })
    .positive("0보다 커야 합니다"),
  bcr: z
    .number({ error: "숫자를 입력하세요" })
    .positive("0보다 커야 합니다")
    .max(100, "건폐율은 100% 이하여야 합니다"),
  zoning: z.string().min(1, "용도지역을 선택하세요"),
  floorsAbove: z
    .number({ error: "숫자를 입력하세요" })
    .int("정수만 입력 가능합니다")
    .positive("1 이상"),
  floorsBelow: z
    .number({ error: "숫자를 입력하세요" })
    .int("정수만 입력 가능합니다")
    .min(0, "0 이상"),
});

export type SiteInfoFormValues = z.infer<typeof siteInfoSchema>;
