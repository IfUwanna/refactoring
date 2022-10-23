import {Province} from "./Province.js";

describe('province', function () {
    // const asia = new Province(sampleProvinceData()); // 테스트끼리 상호작용하게 하는 공유 픽스처 사용 X
    let asia;
    beforeEach(function(){  // 각각의 테스트마다 픽스처 초기화
        asia = new Province(sampleProvinceData());
    })

    it('shortfall', function () { // 생산부족분 테스트
        //const asia = new Province(sampleProvinceData()); // 1.픽스처 설정
        expect(asia.shortfall).toBe(5); // 2.검증
    });

    it('profit', function () { // 총 수익 테스트
        expect(asia.profit).toBe(230);
    });

    it('change production', function () { // production 변경 테스트
        asia.producers[0].production = 20;
        expect(asia.shortfall).toBe(-6);
        expect(asia.profit).toBe(292);
    });

    it('zero demand', function () {  // 수요(demand)가 없다.
        asia.demand = 0
        expect(asia.shortfall).toBe(-25);
        expect(asia.profit).toBe(0);
    });

    it('negative demand', function () { // 수요(demand) 마이너스
        asia.demand = -1
        expect(asia.shortfall).toBe(-26);
        expect(asia.profit).toBe(-10);
    });

    it('empty string demand', function () { // 수요(demand) 입력란이 비어있다.
        asia.demand = "";
        expect(asia.shortfall).NaN;
        expect(asia.profit).NaN;
    });



});

describe('no producers', function () { // 생산자가 없다.
    let noProducersProvince;
    beforeEach(function(){
        const data = {
            name: "No producers",
            producers: [],
            demand: 30,
            price: 20
        };
        noProducersProvince = new Province(data)
    })

    it('shortfall', function () { // 생산부족분 테스트
        expect(noProducersProvince.shortfall).toBe(30);
    });

    it('profit', function () { // 총 수익 테스트
        expect(noProducersProvince.profit).toBe(0);
    });

});

describe('string for producers', function () { // 생산자 수 필드에 문자열 대입
    let prov;
    beforeEach(function(){
        const data = {
            name: "String producers",
            producers: "",
            demand: 30,
            price: 20
        };
        prov = new Province(data)
    })
    it('', function () { // 생산부족분 테스트
        expect(prov.shortfall).equal(0);
    });
});



/* Province 생성자에 필요한 json doc */
function sampleProvinceData() {
    return {
        name: 'Asia',
        producers: [
            {name: 'Byzantium', cost: 10, production: 9},
            {name: 'Attalia', cost: 12, production: 10},
            {name: 'Sinope', cost: 10, production: 6},
        ],
        demand: 30,
        price: 20,
    };
}