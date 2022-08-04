// 1.6 > step1 데이터 생성
export function createStatementData_1_6(invoice,plays){

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance); // 각각 얕은 복사하여 반환 - 원본 데이터를 불변 취급하기 위함
    statementData.totalAmount = totalAmount(statementData);  // 추가정보 삽입
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);  // 추가정보 삽입
    return statementData;

//-----------------------------------------------------------------------------
    function enrichPerformance(aPerformance){
        const result = Object.assign({},aPerformance);  // 공연 배열 요소 shallow copy
        result.play = playFor(result);          // 추가정보 삽입
        result.amount = amountFor(result);      // 추가정보 삽입
        result.volumeCredits = volumeCreditsFor(result);      // 추가정보 삽입
        return result;
    }
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
    function volumeCreditsFor(aPerformance) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0); // 30명 초과 인원당 1점
        if (aPerformance.play.type === 'comedy') {                  // comedy 관객 5명당 1점
            volumeCredits += Math.floor(aPerformance.audience / 5);
        }
        return volumeCredits;
    }
    // 5. volumeCredits 변수제거 - 반복문 분리 > 문장슬라이드 > 함수 추출 > 변수 인라인
    function totalVolumeCredits(data) {
        // for (let perf of data.performances) {
        //     volumeCredits += perf.volumeCredits;
        // }
        return data.performances
        .reduce((total,p)=>total+p.volumeCredits,0);  // for > reduce 파이프라인 적용
    }
    // 6. totalAmount 변수 제거 - 반복문분리 > 문장슬라이드 > 함수추출 > 변수인라인
    function totalAmount(data) {
        // for (let perf of data.performances) {
        //     result += perf.amount;
        // }
        return data.performances
        .reduce((total,p)=>total+p.amount,0); // for > reduce 파이프라인 적용
    }
}
