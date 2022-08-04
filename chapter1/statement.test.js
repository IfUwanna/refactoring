import * as s from "./statement.js";

describe("chapter1. statement", () => {

    const expected =
        "청구 내역 (고객명: BigCo)\n" +
        "  Hamlet: $650.00 (55석)\n" +
        "  As You Like It: $580.00 (35석)\n" +
        "  Othello: $500.00 (40석)\n" +
        "총액: $1,730.00\n" +
        "적립 포인트: 47점\n";

    it("1.1 Let's start", () => {
        expect(s.statement_1_1(s.invoices()[0], s.plays())).toBe(expected);
    });
    it("1.4. statement() 함수 쪼개기", () => {
        expect(s.statement_1_4(s.invoices()[0], s.plays())).toBe(expected);
    });
    it("1.6. 계산 단계와 포맷팅 단계 분리하기", () => {
        expect(s.statement_1_6(s.invoices()[0], s.plays())).toBe(expected);
    });

});