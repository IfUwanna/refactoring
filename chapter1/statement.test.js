import * as s from "./statement.js";
import { invoices,plays } from "./domain.js";

describe("chapter1. statement", () => {

    it("1.1 Let's start", () => {
        expect(s.statement_1_1(invoices()[0], plays())).toBe(expected);
    });
    it("1.4. statement() 함수 쪼개기", () => {
        expect(s.statement_1_4(invoices()[0], plays())).toBe(expected);
    });
    it("1.6. 계산 단계와 포맷팅 단계 분리하기 (statement)", () => {
        expect(s.statement_1_6(invoices()[0], plays())).toBe(expected);
    });
    it("1.8. 계산 단계와 포맷팅 단계 분리하기 (htmlStatement)", () => {
        expect(s.htmlStatement_1_6(invoices()[0], plays())).toBe(htmlExpected);
    });
    it("1.8. 다형성을 활용해 계산 코드 재구성하기", () => {
        expect(s.statement_1_8(invoices()[0], plays())).toBe(expected);
    });

});


const expected =
    "청구 내역 (고객명: BigCo)\n" +
    "  Hamlet: $650.00 (55석)\n" +
    "  As You Like It: $580.00 (35석)\n" +
    "  Othello: $500.00 (40석)\n" +
    "총액: $1,730.00\n" +
    "적립 포인트: 47점\n";

let htmlExpected = `<h1>청구 내역 (고객명: BigCo)</h1>\n`;
htmlExpected += "<table>\n";
htmlExpected += `<tr><th>play</th><th>석</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n`;
htmlExpected += `  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n`;
htmlExpected += `  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n`;
htmlExpected += "</table>\n";
htmlExpected += `<p>총액: <em>$1,730.00</em></p>\n`;
htmlExpected += `<p>적립 포인트: <em>47</em>점</p>\n`;
