
/**
 * 1-1 Let's start
 * */
export function statement1_1(invoice, plays) {

    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {

        const play = plays[perf.playID];
        let thisAmount = 0;

        switch (play.type) {
            case 'tragedy': // 비극
                thisAmount = 40000;  // 기본 4만원 + 30명 초과시 초과인원*1000원
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case 'comedy': // 희극
                thisAmount = 30000; // 기본 3만원 + 20명 초과시 1만원+(초과인원*1000원)
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }
        // 포인트 적립
        volumeCredits += Math.max(perf.audience - 30, 0); // 30명 초과 인원당 1점
        if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5); // comedy 관객 5명당 1점

        // 연극별 청구내역
        result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;

}


/**
 * 1-4 statement 함수 쪼개기
 * */
export function statement1_4(invoice, plays) {

    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
        // 연극별 청구내역
        result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;


//---------------------------------------------------------------------------
    // 1. 공연비 계산 - 함수 추출
    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
            case 'tragedy': // 비극
                result = 40000;  // 기본 4만원 + 30명 초과시 초과인원*1000원
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy': // 희극
                result = 30000; // 기본 3만원 + 20명 초과시 1만원+(초과인원*1000원)
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }
        return result;
    }

    // 2. play 추출 - 임시 변수를 질의함수로 바꾸기
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    // 3. 포인트 계산 함수 추출
    function volumeCreditsFor(perf) {
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0); // 30명 초과 인원당 1점
        if (playFor(perf).type === 'comedy') {                  // comedy 관객 5명당 1점
            volumeCredits += Math.floor(perf.audience / 5);
        }
        return volumeCredits;
    }
    // 4. format 변수 제거  - 함수 선언 바꾸기 적용 format > usd
    function usd(aNumber) {
        return new  Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(aNumber/100);
    }
    // 5. volumeCredits 변수제거 - 반복문 분리 > 문장슬라이드 > 함수 추출 > 변수 인라인
    function totalVolumeCredits() {
        let volumeCredits = 0;  //  volumeCredits 변수제거 = 문장 슬라이드하기
        for (let perf of invoice.performances) { // volumeCredits 변수 제거 - 반복문 쪼개기,
            volumeCredits += volumeCreditsFor(perf); // 포인트 적립 함수 추출
        }
        return volumeCredits;
    }
    // 6. totalAmount 변수 제거 - 반복문분리 > 문장슬라이드 > 함수추출 > 변수인라인
    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }

}



export function plays() {
    return {
        hamlet: {name: "Hamlet", type: "tragedy"},
        "as-like": {name: "As You Like It", type: "comedy"},
        othello: {name: "Othello", type: "tragedy"},
    };
}


export function invoices() {
    return [
        {
            customer: "BigCo",
            performances: [
                {
                    playID: "hamlet",
                    audience: 55,
                },
                {
                    playID: "as-like",
                    audience: 35,
                },
                {
                    playID: "othello",
                    audience: 40,
                },
            ],
        },
    ];
}