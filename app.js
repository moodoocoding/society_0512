const STARTING_COINS = 5;
const REQUIRED_FACTORS = 2;

const factorLabels = {
  job: "일자리",
  rent: "집값·월세",
  medical: "의료",
  culture: "문화",
  traffic: "교통",
  family: "가족",
  friends: "친구",
  policy: "정책",
  environment: "환경",
  prices: "물가",
};

const factorDescriptions = {
  job: "수입을 얻을 기회",
  rent: "매달 내는 주거비",
  medical: "병원과 진료 접근성",
  culture: "여가와 지역 활동",
  traffic: "이동 시간과 교통비",
  family: "가족과 이웃 도움",
  friends: "친구 관계와 적응",
  policy: "정부와 지역 지원",
  environment: "소음, 미세먼지, 쾌적함",
  prices: "생활 물건 가격",
};

const ROUND_TAGS = ["시작", "정착", "의료", "주거", "교통", "정책", "산업", "과밀", "최종"];

function metroOption(label, income, costs, result) {
  return { label, income, costs, result };
}

function localOption(label, income, employmentRate, costs, success, fail) {
  return { label, income, employmentRate, costs, success, fail };
}

const defaultMetro = metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }], "수도권 생활을 이어가며 월급을 받았습니다.");
const defaultLocal = localOption(
  "지방 선택",
  2,
  0.5,
  [{ label: "월세", amount: 1 }],
  "지방에서 일자리를 구하고 생활비를 아꼈습니다.",
  "생활비는 낮지만 이번에는 일자리를 구하지 못했습니다.",
);

function scenario(title, tag, scene, question, factors, coreFactors, metro = defaultMetro, local = defaultLocal, insight = "") {
  return { title, tag, scene, question, factors, coreFactors, metro, local, insight };
}

const rounds = [
  {
    common: scenario(
      "시작: 나의 첫 동네", 
      "결정", 
      "부모님 집을 떠나 처음으로 내 방을 구해야 하는 날이다. 혼자 살려면 스스로 돈을 벌어야 하고 매달 방값도 내야 한다. 큰 회사가 많아 일자리를 구하기 쉬운 도시가 좋을까, 아니면 방값이 적게 들어 부담이 덜한 지역이 좋을까? 이제 어른으로서 첫 번째 선택을 내려야 한다.", 
      "첫 동네를 고를 때 가장 중요하게 생각해야 할 조건 2가지는 무엇일까요?", 
      ["job", "rent", "culture", "environment"], 
      ["job", "rent"], 
      metroOption("수도권 시작", 0, [], "수도권에서 첫 독립을 시작합니다."), 
      localOption("지방 시작", 0, 1, [], "지방에서 조용한 독립을 시작합니다.", "일자리를 구하지 못해 수입이 없습니다."), 
      "일자리(돈을 버는 것)와 방값(돈을 쓰는 것)은 가장 중요한 기본 조건입니다."
    ),
  },
  {
    metro: scenario(
      "오르는 방값", 
      "주거", 
      "수도권 생활은 돈이 많이 든다. 회사에 출근해서 열심히 돈을 벌고 있지만, 매달 나가는 비싼 월세를 보면 한숨이 나온다. 다음 달에는 방세가 더 오른다는데, 이대로 계속 회사에 다니면서 비싼 방값을 내고 살아도 괜찮은 걸까?", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "rent", "traffic", "prices"], 
      ["job", "rent"], 
      metroOption("수도권 유지", 3, [{ label: "비싼 월세", amount: 4 }], "월급은 들어오지만 비싼 방값으로 통장이 텅 비었습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "저렴한 월세 덕분에 생활비 부담이 팍 줄었습니다.", "월세는 아꼈지만 일자리가 없어 막막합니다."), 
      "월급을 받아도 방값이 너무 오르면 실제로 쓸 돈이 부족해집니다."
    ),
    local: scenario(
      "여유롭지만 불안한 생활", 
      "주거", 
      "지방이라 방값이 싸서 매달 나가는 주거비가 줄어 통장에 돈이 제법 남는다. 하지만 제대로 취직하려고 하니 마땅히 돈을 벌 회사가 보이지 않는다. 방세는 덜 내지만, 계속 취직을 못해서 일자리가 없으면 어떡할지 걱정된다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["rent", "job", "prices", "traffic"], 
      ["rent", "job"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "수도권 회사에 취업했지만 비싼 월세를 내야 합니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "지방의 싼 방값 덕분에 돈을 잘 모았습니다.", "일자리를 찾지 못해 돈을 벌지 못했습니다."), 
      "돈을 아끼는 것만큼 계속해서 돈을 벌 수 있는 직장을 구하는 것도 중요합니다."
    ),
    metro_crisis: scenario(
      "집주인의 연락", 
      "위기", 
      "퇴근길에 집주인으로부터 문자를 받았다. 다음 달부터 방값을 훨씬 더 올리겠다는 내용이었다. 당장 비싼 월세를 어떻게 감당할지 막막한데, 마트 물건값도 덩달아 다 오르고 있어 밥값 부담도 엄청나다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["rent", "prices", "traffic", "job"], 
      ["rent", "prices"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "물가", amount: 1 }], "월급을 탔지만 오르는 월세와 밥값을 내기 힘듭니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "방값이 싼 곳으로 이사해서 위기를 탈출했습니다.", "돈 쓸 일은 줄였지만 새 직장이 없어 힘듭니다."), 
      "매달 꼭 내야 하는 돈이 늘어나면 이사를 심각하게 고민하게 됩니다."
    ),
    local_crisis: scenario(
      "일자리가 없다", 
      "위기", 
      "마트 물건값이 조금씩 올라 밥값과 생활비 부담이 커지는 게 느껴진다. 게다가 이번 달에도 회사 면접에서 떨어져 취직을 못했다. 모아둔 돈은 바닥이 보이는데 이곳에는 더 이상 취업할 회사가 없는 것 같다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["rent", "prices", "traffic", "job"], 
      ["job", "prices"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }, { label: "이사비", amount: 1 }], "수도권으로 이사해 취업했지만 이사비용이 크게 들었습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "적은 돈으로 간신히 버티고 있습니다.", "이번 달에도 수입이 없어 어려움이 커집니다."), 
      "아무리 생활비가 적게 들어도 돈을 벌 수 없으면 위기가 찾아옵니다."
    ),
    metro_opportunity: scenario(
      "도심 밖 저렴한 집", 
      "기회", 
      "부동산 앱을 보다가, 번화가에서 조금 멀지만 아주 싼 집을 찾았다! 출퇴근 버스 타는 시간은 훨씬 더 길어지겠지만, 매달 내야 하는 비싼 월세를 크게 줄일 수 있는 기회다. 교통이 불편해져도 방값을 아끼는 게 나을까?", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["rent", "traffic", "policy", "job"], 
      ["rent", "traffic"], 
      metroOption("수도권 유지(외곽)", 3, [{ label: "월세", amount: 2 }, { label: "교통비", amount: 1 }], "출퇴근이 멀어졌지만 월세 걱정을 크게 덜었습니다!"), 
      localOption("지방 이동", 2, 1, [{ label: "월세", amount: 1 }], "이참에 더 싼 곳으로 아예 내려가기로 했습니다.", "오히려 일이 잘 안 풀려 후회 중입니다."), 
      "집이 번화가에서 멀어질수록 방값은 싸지지만 교통 시간은 늘어납니다."
    ),
    local_opportunity: scenario(
      "숨은 보석 같은 집", 
      "기회", 
      "시청에서 청년들의 방값을 대신 내주는 정책에 당첨되었다! 나라의 도움 덕분에 공짜에 가까운 아주 싼 월세로 예쁜 집에 살 수 있게 되었다. 이런 지원 혜택 덕분에 주거비 걱정은 완전히 끝났다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["rent", "traffic", "policy", "job"], 
      ["rent", "policy"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 1 }], "좋은 기회를 포기하고 다시 번잡한 도시로 올라왔습니다."), 
      localOption("지방 유지", 2, 1, [{ label: "월세", amount: 0 }], "파격적인 월세 지원 혜택 덕분에 통장이 두둑해졌습니다!", "정책 혜택은 좋지만 일자리를 못 구해 불안합니다."), 
      "지자체의 도움을 잘 찾아보면 훨씬 돈을 적게 들이고 살 수 있습니다."
    ),
  },
  {
    metro: scenario(
      "숨 막히는 출퇴근길", 
      "교통", 
      "오늘도 발 디딜 틈 없는 꽉 막힌 버스에 끼어 출근했다. 길에는 매연이 가득해서 숨쉬기 답답하고 냄새가 난다. 이 복잡한 출퇴근 교통과 답답한 도시 환경에서 벗어날 수는 없을까?", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["traffic", "environment", "prices", "rent"], 
      ["traffic", "environment"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 1 }], "피곤함을 꾹 참고 출근하며 매일 교통비를 씁니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "여유로운 출퇴근길을 찾아 복잡함을 피했습니다.", "출퇴근은 편해졌는데 일거리가 없습니다."), 
      "사람이 많이 몰리는 곳은 교통이 복잡하고 환경이 답답해집니다."
    ),
    local: scenario(
      "버스가 오지 않아", 
      "교통", 
      "병원에 가려고 버스 정류장에 나왔는데, 다음 버스가 오려면 1시간이나 기다려야 한다. 자동차가 없으면 아플 때 의사 선생님을 만나러 진료를 받으러 가는 길조차 너무 오래 걸리고 불편하다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["traffic", "medical", "job", "prices"], 
      ["traffic", "medical"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }, { label: "이사비", amount: 1 }], "가고 싶을 때 언제든 나갈 수 있는 도시로 돌아왔습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "버스 시간을 달달 외우며 적응해 나가고 있습니다.", "나가지도 못하고 돈도 못 벌어 막막합니다."), 
      "버스와 기차가 부족하면 생활에 꼭 필요한 병원이나 상점에 가기 어렵습니다."
    ),
    metro_crisis: scenario(
      "지하철 파업의 날", 
      "위기", 
      "아침부터 버스와 지하철 운행이 멈췄다. 꽉 막힌 도로에서 자동차들이 내뿜는 탁한 매연을 마시며 길거리를 헤매다 보니 너무 피곤하다. 지옥 같은 교통 혼잡과 매연 가득한 공기 때문에 하루가 다 망가졌다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["traffic", "environment", "job", "rent"], 
      ["traffic", "environment"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 3 }], "엄청난 피로와 비싼 교통비를 쓰며 겨우 출근했습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "혼잡함을 견디지 못하고 미련 없이 떠났습니다.", "차는 안 막히는데 취직이 막혔습니다."), 
      "인구가 너무 모인 곳에서 생기는 문제는 아주 많은 사람을 힘들게 합니다."
    ),
    local_crisis: scenario(
      "오래 걸리는 길", 
      "위기", 
      "갑작스럽게 큰 수술 전문 병원에 갈 일이 생겼다. 하지만 이 동네에는 큰 병원이 없어 기차를 갈아타고 멀리까지 가야 한다. 아픈 몸을 이끌고 덜컹거리는 길 위에서 하루를 다 써야 하니 정말 큰일이다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["traffic", "medical", "job", "rent"], 
      ["traffic", "medical"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 2 }], "급할 때를 대비하려고 비싼 방값을 내며 이사했습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "외출비용", amount: 2 }], "멀고 비싼 병원 길이었지만 꾹 참았습니다.", "돈만 많이 쓰고 이번 달 취직은 실패했습니다."), 
      "병원 등 꼭 필요한 시설로 가는 길이 불편하면 예상 못 한 피해가 생깁니다."
    ),
    metro_opportunity: scenario(
      "급행 철도가 뚫리다", 
      "기회", 
      "시청에서 발표한 새로운 교통 정책 덕분에 우리 동네에 아주 빠른 기차역이 생겼다! 정부의 전폭적인 지원으로 공사가 일찍 끝나서, 이제 매일 막히던 고통 없이 아주 편하게 기차를 탈 수 있다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "traffic", "medical", "job"], 
      ["policy", "traffic"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "앞으로 길이 편해진다는 희망으로 버팁니다."), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "새 철도를 버려두고 다른 곳으로 떠납니다.", "막상 떠나보니 편한 기차가 아쉽습니다."), 
      "교통이 좋아지면 직장인들의 가장 큰 스트레스가 사라집니다."
    ),
    local_opportunity: scenario(
      "광역 버스 개통", 
      "기회", 
      "다른 도시의 회사들을 바로 연결해주는 새 버스 노선이 뚫렸다! 이제 차가 없어도 버스만 타면 먼 곳까지 돈을 벌러 나갈 수 있다. 버스가 다니기 시작하면서 내가 취업할 수 있는 일자리의 범위가 훨씬 넓어졌다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "traffic", "medical", "job"], 
      ["traffic", "job"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "버스가 다녀도 왠지 도시가 좋을 것 같아 떠났습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "좋아진 대중교통 덕분에 마음에 쏙 드는 일을 구했습니다!", "버스는 다루기 편해졌는데 나에게 맞는 직장은 못 찾았습니다."), 
      "시골의 교통이 개선되면 직장 선택의 기회가 넓어집니다."
    ),
  },
  {
    metro: scenario(
      "회사들이 이사를 간대", 
      "정책", 
      "정부에서 수도권의 큰 회사들을 지방으로 옮기면 큰 혜택을 주는 정책을 발표했다. 회사 동료들도 '나라의 정책 지원을 받고 지방으로 내려가 일자리를 잡을까?' 고민하는 눈치다. 정책의 혜택을 받으며 회사를 옮길 좋은 기회일까?", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "job", "rent", "prices"], 
      ["policy", "job"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }], "익숙한 곳에 남았지만 예전만큼 기회가 많지 않습니다."), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "나라의 지원을 받고 내려가는 회사를 따라가 튼튼한 직장을 잡았습니다.", "지원금이 나오는 줄 알았는데 일이 잘 안 풀렸습니다."), 
      "나라의 정책은 청년들의 일자리와 사는 동네를 바꿀 힘이 있습니다."
    ),
    local: scenario(
      "우리 동네 살리기", 
      "정책", 
      "동네 구석구석에 정부의 '우리 동네 살리기' 정책 현수막이 붙었다. 나라의 큰 예산 지원으로 최고급 병원이 들어설 예정이라고 한다. 이 훌륭한 정책 혜택 덕분에 우리도 언제든지 안심하고 진료를 받을 수 있을 것 같다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "medical", "rent", "job"], 
      ["policy", "medical"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "언제 정책이 완성될지 기다리기 지쳐 떠났습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "정책의 혜택을 톡톡히 받으며 안심하고 지내고 있습니다.", "아직은 병원 공사가 안 끝나 변화가 없습니다."), 
      "사람들을 늘리기 위한 정부의 노력은 살기 편한 시설을 늘려줍니다."
    ),
    metro_crisis: scenario(
      "느껴지지 않는 혜택", 
      "위기", 
      "정부에서 청년들을 위한 방값 지원 정책을 내놓았지만, 조건이 너무 까다로워 나는 그 제도를 쓸 수가 없다. 나라의 도움도 전혀 못 받고 있는데 매달 내야 하는 월세는 계속 오르고 있어서 화가 난다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["policy", "rent", "prices", "job"], 
      ["policy", "rent"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "물가", amount: 1 }], "정책 혜택도 못 받고 비싼 월세를 그대로 다 냈습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "진짜 혜택을 주는 제도를 찾아 과감히 떠났습니다.", "도움받을 생각에 왔건만 정작 돈을 못 벌고 있습니다."), 
      "정책의 도움을 나 스스로 느끼지 못하면 답답함은 더 커집니다."
    ),
    local_crisis: scenario(
      "멈춰버린 동네 공사", 
      "위기", 
      "마을에 멋지게 짓기로 했던 청년 전문 병원 공사가 중단되었다. 시청의 예산 부족으로 정책이 멈췄다는데, 유일하게 기댈 큰 병원이 생길 거란 희망이 박살 나버려 너무 불안하다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["policy", "medical", "culture", "traffic"], 
      ["policy", "medical"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "결국 정부 약속을 믿을 수 없어 다 갖춰진 도시로 도망쳤습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "비용", amount: 1 }], "제도가 다시 살아나길 언젠가 완공되길 기다려 봅니다.", "정책을 기다리기만 하다가 직장 잡을 타이밍을 놓쳤습니다."), 
      "약속했던 정책이 취소되어 시설이 만들어지지 않으면 실망한 사람들이 떠나게 됩니다."
    ),
    metro_opportunity: scenario(
      "교통 자유이용권", 
      "기회", 
      "정부에서 대중교통 요금을 깎아주는 훌륭한 교통 지원 정책을 시작했다! 이 제도에 신청했더니 매달 수십만 원씩 나가던 지하철과 버스비가 뚝 떨어졌다. 정말 피부에 와닿는 정책 혜택이다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "traffic", "rent", "prices"], 
      ["policy", "traffic"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "교통 정책 덕분에 길 다니기가 훨씬 가벼워졌습니다!"), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "혜택 제도를 버리고 아예 조용한 시골로 갑니다.", "엉뚱한 제도를 쫓아갔다가 돈만 더 쓰게 됐습니다."), 
      "실제로 도움이 되는 제도는 직장인들의 주머니를 든든하게 합니다."
    ),
    local_opportunity: scenario(
      "엄청난 이사 축하금", 
      "기회", 
      "우리 동네로 이사 오는 청년들에게 시청에서 매달 '방값 지원금' 정책 혜택을 쏜다고 한다. 이 지원 제도 덕분에 매달 내야 하는 높은 월세 걱정이 완전히 사라졌다! 이런 엄청난 정부 정책이라면 누구든 부럽지 않다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["policy", "rent", "prices", "culture"], 
      ["policy", "rent"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "그깟 정책 지원금보다 도시가 좋아 다시 돌아갔습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }, { label: "혜택", amount: -2 }], "정책의 방값 지원금 덕분에 주머니가 빵빵해졌습니다!", "지원은 좋지만 일거리가 없어 아쉽습니다."), 
      "강력한 혜택을 주는 제도는 사람들에게 큰 용기를 줍니다."
    ),
  },
  {
    metro: scenario(
      "끝없는 자격증 공부", 
      "산업", 
      "수도권에는 취업할 대단한 회사가 많지만, 경쟁자들도 많다. 좋은 일자리에 취직하기 위해 시험 준비비용과 비싼 밥값, 물건값으로 내 돈이 쉴 새 없이 빠져나간다. 취업 준비와 생활비 감당에 너무 지친다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "prices", "rent", "traffic"], 
      ["job", "prices"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "준비비", amount: 2 }], "경쟁에서 이기려고 비싼 밥값을 내며 돈을 더 씁니다."), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "너무 높은 생활비를 피해 조용한 길을 찾았습니다.", "경쟁과 물가는 피했는데 취업할 데가 안 보입니다."), 
      "기회가 많은 곳은 그만큼 물가와 준비를 위해 포기해야 할 돈이 많습니다."
    ),
    local: scenario(
      "멋진 동네 회사들", 
      "산업", 
      "지방에도 똑똑한 농업 기술을 만드는 훌륭한 회사들이 생겨나고 있다. 무엇보다 자동차 소리나 매연이 없는 깨끗하고 맑은 자연 속에서 좋은 직장을 다닐 수 있다니 꿈만 같다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "environment", "rent", "policy"], 
      ["job", "environment"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "새로운 기회를 뒤로하고 번화가로 향했습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "맑은 공기를 마시며 멋진 회사에 취직해 편하게 돈도 법니다!", "새로운 회사는 많지만 아직 저를 뽑아주진 않았습니다."), 
      "지역의 특징을 잘 살린 직장은 훌륭한 환경과 결합하면 도시에 버금갑니다."
    ),
    metro_crisis: scenario(
      "갑작스런 해고 소문", 
      "위기", 
      "다니던 회사에서 곧 일자리를 줄인다는 흉흉한 소문이 돈다. 당장 다음 달 내야 할 비싼 월세와 방값이 산더미인데 쫓겨나면 길거리에 나앉아야 한다. 취업 자리마저 잃게 생기니 너무나 두렵다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["job", "rent", "prices", "family"], 
      ["job", "rent"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "생활비", amount: 2 }], "월세를 내기 위해 쫓겨나지 않으려 발버둥 칩니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "잠시 쉬기 위해 짐을 싸서 싼 곳으로 피신했습니다.", "도망치듯 내려왔더니 정말 취업의 문이 닫혔습니다."), 
      "방값이 비싼 곳에서 일자리를 잃는 것은 엄청난 위험입니다."
    ),
    local_crisis: scenario(
      "문 닫는 공장들", 
      "위기", 
      "마을 사람들의 주된 일자리였던 커다란 공장이 결국 문을 닫았다. 사람들이 다 일자리를 잃자 밥을 사 먹을 돈이 떨어져 주변 상점과 마트들도 줄줄이 폐업하고 있어, 남은 사람들은 빵조차 사 먹기 힘든 가난한 물가를 겪게 생겼다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["job", "prices", "culture", "traffic"], 
      ["job", "prices"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "빨리 일자리를 찾아 화려한 도시로 떠났습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "가난해진 동네에 남아 어떻게든 살아보려 애씁니다.", "공장이 떠나버리니 동네에 일거리가 씨가 말랐습니다."), 
      "마을을 먹여 살리던 일자리가 사라지면 동네의 경제 전체가 무너집니다."
    ),
    metro_opportunity: scenario(
      "좋은 회사에서 온 연락", 
      "기회", 
      "유명한 대기업에서 내 능력을 알아보고 아주 높은 월급의 일자리로 취직하라는 제안을 받았다! 게다가 이 회사는 주말에 유명한 뮤지컬이나 콘서트 관람 티켓 등 엄청난 여가 활동 혜택까지 공짜로 준다고 한다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "culture", "rent", "traffic"], 
      ["job", "culture"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "일자리와 놀거리 혜택 모두 잡으며 통장에 큰돈이 들어옵니다!"), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "좋은 취업 기회를 차버리고 조용한 산속으로 숨었습니다.", "기회를 놓치고 크게 후회 중입니다."), 
      "좋은 일자리를 잡으면 문화생활까지 풍족해지는 혜택이 따라오기도 합니다."
    ),
    local_opportunity: scenario(
      "마을 홍보 영상 대박", 
      "기회", 
      "조용하고 맑은 우리 동네 자연환경을 유튜브로 찍어 올렸는데 엄청난 대박이 났다! 나는 이제 쾌적하고 맑은 환경 속에서 여유롭게 일하면서도 큰돈을 버는 영상 직업을 갖게 되었다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "environment", "culture", "policy"], 
      ["job", "environment"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "맑은 공기를 뒤로하고 빌딩 숲으로 직장을 옮겼습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "자연 속에서 멋진 크리에이터가 되어 큰 돈을 멉니다!", "영상 조회수가 안 나와 이번 달은 수입이 없습니다."), 
      "우리 동네만의 매력을 잘 살리면 쾌적한 곳에서도 수입을 낼 수 있습니다."
    ),
  },
  {
    metro: scenario(
      "즐거운 주말 놀거리", 
      "문화", 
      "도시의 번화가에는 유명한 게임센터와 놀이공원, 좋아하는 가수의 콘서트가 끝도 없이 열린다. 재밌게 놀 수 있어서 너무 신나지만, 티켓값과 밥값 등 비싼 물가 때문에 지갑이 순식간에 텅 비어버린다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["culture", "prices", "traffic", "job"], 
      ["culture", "prices"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "놀이비용", amount: 2 }], "신나게 놀며 즐겼지만 비싼 물가 탓에 지갑은 가벼워졌습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "물가가 무서워 조용한 휴식만 가졌습니다.", "재미있는 놀거리도 없고 아낄 돈도 없어 지루합니다."), 
      "재미있는 놀거리가 많아도 모든 것엔 비싼 비용이 따릅니다."
    ),
    local: scenario(
      "조금 심심한 저녁", 
      "문화", 
      "내가 좋아하는 영화를 보거나 전시회에 놀러 가려면, 자동차나 기차를 타고 옆 도시까지 한참을 가야 한다. 재미난 구경거리 하나를 위해 멀리까지 길을 다녀야 하는 불편함이 정말 너무 크다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["culture", "traffic", "medical", "job"], 
      ["culture", "traffic"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "핫한 놀거리를 찾아 다시 편한 길을 따라 도시로 올라왔습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "긴 이동 시간을 감수하며 가끔 나들이를 다녀옵니다.", "놀러 나가는 길도 불편하고 너무 심심하기만 합니다."), 
      "놀거리를 찾으려면 교통의 편리함이 무엇보다 중요해집니다."
    ),
    metro_crisis: scenario(
      "예약 실패의 슬픔", 
      "위기", 
      "오랜만에 열린 아주 큰 음악 축제 티켓을 사려 했지만 사람이 너무 많아 표를 구하지 못했다. 비싼 표값을 낼 준비가 되어 있는데도 인기가 너무 많아 구경도 못 하다니 너무 짜증이 난다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["culture", "prices", "traffic", "rent"], 
      ["culture", "prices"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "물가", amount: 2 }], "비싼 돈만 내고 축제 맨 뒷자리에서 남 뒤통수만 보다 왔습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "물가와 사람들에 치여 덜 복잡한 곳으로 도망쳤습니다.", "도망은 쳤지만 정말 너무 재미가 없습니다."), 
      "사람이 너무 많으면 돈을 내고서라도 즐거운 놀거리를 얻기 어렵습니다."
    ),
    local_crisis: scenario(
      "문 닫은 동네 극장", 
      "위기", 
      "우리 동네의 유일한 자랑거리였던 작은 영화관이 완전히 문을 닫았다. 이제 영화 한 편 보면서 놀고 싶어도, 매번 덜컹거리는 기차를 타고 멀리 떨어진 낯선 곳까지 피곤하게 가야만 한다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["culture", "traffic", "medical", "family"], 
      ["culture", "traffic"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }, { label: "교통비", amount: 1 }], "놀거리 없이는 못 살아! 하며 짐을 싸서 떠났습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "먼여행비용", amount: 2 }], "큰마음 먹고 기차표를 끊고 멀리 영화를 보러 다녀왔습니다.", "왕복 기차표만 날리고 허탈하게 돌아왔습니다."), 
      "놀거리가 없어지면 그걸 찾기 위한 도로 위 시간의 고통이 커집니다."
    ),
    metro_opportunity: scenario(
      "팝업스토어 아르바이트", 
      "기회", 
      "집 앞 놀이공원에서 며칠간 크게 열리는 게임 축제장에서 아르바이트를 구했다! 재미난 구경거리를 실컷 즐기면서 시급까지 두둑하게 챙기니, 놀거리와 일자리를 동시에 얻은 최고의 경험이다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["culture", "job", "rent", "traffic"], 
      ["culture", "job"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "짭짤하게 수입도 얻고 축제도 재밌게 즐겼습니다!"), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "재미난 일거리를 포기하고 조용한 시골로 떠났습니다.", "돈도 벌지 못하고 구경도 놓쳤습니다."), 
      "인기 있는 축제는 사람들에게 즐거움과 함께 소소한 수입의 기회도 줍니다."
    ),
    local_opportunity: scenario(
      "마을 축제 대성공", 
      "기회", 
      "우리 이웃사촌들과 힘을 모아 만든 아주 특별한 '시골 동네 축제'가 인터넷에 퍼지면서 대박이 났다! 친척처럼 끈끈해진 가족 같은 이웃들과 함께 밤새워 노래 부르며 우리들만의 환상적인 놀거리를 즐기고 있다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["culture", "family", "environment", "job"], 
      ["culture", "family"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "성공을 맛보고 더 자극적인 놀이를 찾아 도시로 떠났습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "이웃 식구들과 끈끈하게 웃고 떠들며 마을을 즐깁니다!", "축제는 멋졌지만 소문이 금방 식어버렸습니다."), 
      "가까운 이웃과 함께하면 세상 어디에도 없는 훌륭한 축제를 만들 수 있습니다."
    ),
  },
  {
    metro: scenario(
      "급할 때 달리는 응급실", 
      "의료", 
      "한밤중에 갑자기 배가 너무 아팠는데, 아주 가까운 거리에 24시간 불이 켜진 훌륭한 큰 병원이 있어서 금방 나았다. 의사 선생님이 이렇게 든든하지만, 이런 동네의 무서운 비싼 월세를 계속 낼 수 있을지 걱정이다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["medical", "rent", "traffic", "prices"], 
      ["medical", "rent"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }], "비싼 방값이 아깝지 않을 만큼 치료를 든든하게 받았습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "병원은 걱정되지만 무서운 방값을 피해 도망쳤습니다.", "몸은 안 아팠지만 돈을 벌지 못해 속이 아픕니다."), 
      "뛰어난 응급실을 곁에 두는 것은 생명에 중요하지만 그만큼 주거비용이 비쌉니다."
    ),
    local: scenario(
      "소아과 줄 서기", 
      "의료", 
      "동네에 남은 병원이 하나밖에 없어서, 주사 한 대 맞으려고 몇 시간째 서서 기다리는 중이다. 병원에 가기 위해선 버스를 타고 멀리 나가야 하는데다, 버스조차 몇 대 없어서 의사 선생님을 보러 가는 길이 정말 고역이다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["medical", "traffic", "job", "policy"], 
      ["medical", "traffic"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }, { label: "이사비", amount: 1 }], "치료도 제때 못 받는 게 무서워 큰 병원 옆으로 이사했습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "치료비", amount: 1 }], "버스를 기다려 몇 시간 끝에 간신히 의사 선생님을 만났습니다.", "병원 가는 길에서 시간을 다 버려서 아무 일도 못했습니다."), 
      "병원이 부족해지면 아픈 것도 서러운데 이동하는 불편함까지 커집니다."
    ),
    metro_crisis: scenario(
      "구급차 병원 찾기", 
      "위기", 
      "길에서 크게 다쳐 구급차를 탔다. 하지만 차들이 너무 꽉 막혀 도로가 꼼짝하지 않는 바람에 수십 분을 허비했다. 큰 병원이 아무리 많아도, 이런 끔찍한 교통 체증 속에선 제때 치료를 받지 못해 죽을 수도 있겠구나 싶었다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["medical", "traffic", "prices", "rent"], 
      ["medical", "traffic"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "비싼치료비", amount: 2 }], "어찌어찌 지각 안 하고 치료를 무사히 마쳤습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "도로가 막혀 치료를 못 받는 게 무서워 떠났습니다.", "길은 안 막히는데 취직할 곳이 하나도 없습니다."), 
      "병원 시설이 아무리 많아도 길이 막히면 응급 상황에서 쓸모가 없어집니다."
    ),
    local_crisis: scenario(
      "마을 병원의 폐업", 
      "위기", 
      "청천벽력 같은 소식이다. 동네에 하나 있던 병원이 결국 폐업했다. 이제 밤에 크게 다치면 구급차를 타고 캄캄한 고속도로를 1시간이나 달려 딴 동네로 가야만 한다. 멀고 무서운 길 위에서 생명을 걸어야 한다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["medical", "traffic", "policy", "rent"], 
      ["medical", "traffic"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }, { label: "이사비", amount: 2 }], "살기 위해 서둘러 교통 편하고 병원 많은 도시로 도망쳤습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "먼치료비", amount: 2 }], "먼 길을 달리고 달려 간신히 다른 도시 병원에 다녀왔습니다.", "구급차를 부르고 이동하느라 엄청난 고생만 했습니다."), 
      "병원이 사라진다는 것은 응급 상황 시 이동 시간의 커다란 위험을 뜻합니다."
    ),
    metro_opportunity: scenario(
      "건강검진 지원 당첨", 
      "기회", 
      "운 좋게 내가 다니는 회사에서 직원들의 건강을 챙겨주려고 훌륭한 대학 병원의 무료 건강 검진 티켓을 주었다! 대기업 취업에 성공한 덕분에 돈 한 푼 안 내고 최고급 의료 기계로 내 몸 상태를 전부 점검했다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["medical", "job", "policy", "rent"], 
      ["medical", "job"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }], "훌륭한 직장 덕분에 완벽하게 건강 관리를 받았습니다."), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "검진만 딱 받고 훌륭한 직장을 관뒀습니다.", "일자리를 버린 탓에 생활고에 시달립니다."), 
      "좋은 일자리에 취직하면 병원 혜택까지 아주 좋아질 수 있습니다."
    ),
    local_opportunity: scenario(
      "찾아오는 진료 버스", 
      "기회", 
      "나라에서 시행하는 새로운 지원 정책으로, 훌륭한 의사 선생님들이 직접 장비를 싣고 마을에 '찾아오는 진료 버스'가 왔다! 정부의 꼼꼼한 제도 혜택 덕분에 아주 편안하게 병원 치료를 제대로 받을 수 있었다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["medical", "policy", "traffic", "family"], 
      ["medical", "policy"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "버스를 기다리는 게 귀찮아 아예 시청 옆 큰 병원으로 이사했습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "나라의 지원 정책 덕분에 돈 안 들이고 튼튼하게 진료받았습니다!", "치료는 잘 받았지만 정책 지원이 이번 한 번뿐이었습니다."), 
      "정부의 제도가 잘 마련되면 멀리서도 훌륭한 병원 진료를 받을 수 있습니다."
    ),
  },
  {
    metro: scenario(
      "이름 모를 옆집 사람", 
      "가족", 
      "원룸에 1년 넘게 살았지만 내 옆집에 누가 사는지조차 모른다. 아플 때 도와줄 부모님도 곁에 없어 너무 고독하다. 누구의 간섭도 없는 철저히 혼자만의 삶이지만, 내가 매달 내야 할 지독하게 비싼 월세와 방값만 남았다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["family", "rent", "environment", "job"], 
      ["family", "rent"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }], "지독한 외로움을 꾹 참고 비싼 월세를 내며 묵묵히 지냅니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "따뜻한 이웃의 정을 찾아 월세 싼 곳으로 떠납니다.", "이웃은 만났지만 일자리를 못 구했습니다."), 
      "대도시는 자유롭지만 깊은 고독과 높은 주거 비용의 그림자가 있습니다."
    ),
    local: scenario(
      "할머니의 상추 봉지", 
      "가족", 
      "퇴근길에 옆집 할머니가 텃밭에서 딴 상추와 장조림을 한 움큼 쥐여주신다. 마치 친할머니처럼 나를 보살펴주는 따뜻한 이웃 덕분에 마음이 포근하다. 게다가 소음 하나 없는 조용하고 맑은 자연 속에 있으니 이곳이 천국 같다.", 
      "이 상황에서 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["family", "environment", "job", "prices"], 
      ["family", "environment"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "할머니의 정을 뒤로하고 시끄러운 도시로 바쁘게 올라왔습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "따뜻한 이웃들과 조용하고 평화롭게 어울려 살아갑니다.", "이웃은 좋지만 취업의 문은 냉정하게 닫혔습니다."), 
      "이웃과 가족의 정, 그리고 깨끗한 공기가 만나면 엄청난 마음의 위로가 됩니다."
    ),
    metro_crisis: scenario(
      "아파서 끙끙 앓던 밤", 
      "위기", 
      "독감에 걸려 침대에 누워 끙끙 앓고 있다. 나 대신 병원에 데려가 주거나 간호해 줄 가족 하나 없이 나 혼자다. 열이 너무 나서 응급실이라도 가고 싶지만, 나 혼자 아픈 몸을 이끌고 의사 선생님을 찾아가야 한다는 게 눈물겹다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["family", "medical", "rent", "traffic"], 
      ["family", "medical"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "약값", amount: 2 }], "혼자 구급차를 부르고 악착같이 병원에 다녀왔습니다."), 
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "이사비", amount: 1 }], "부모님 품과 다정한 병원이 그리워 고향 집으로 내려갔습니다.", "아픈 건 나았지만 일자리를 영원히 잃었습니다."), 
      "도와줄 가족이 없으면 병원 가기조차 힘들 만큼 위기에 취약해집니다."
    ),
    local_crisis: scenario(
      "마을 사람들의 싸움", 
      "위기", 
      "평화롭던 마을에 외부에서 새로 온 사람들과 원래 살던 할머니, 할아버지들 사이에 쓰레기 문제로 크게 싸움이 났다. 끈끈했던 이웃들이 서로 욕하고 싸우면서, 조용하고 쾌적했던 동네 분위기가 엉망진창으로 오염되었다.", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["family", "environment", "culture", "job"], 
      ["family", "environment"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }, { label: "이사비", amount: 1 }], "누가 참견 안 하는 차가운 도시로 차라리 도망쳤습니다."), 
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "서로 화해하도록 나서서 분위기를 깨끗하게 바꿨습니다.", "싸움은 말렸지만 취업 문제는 못 풀었습니다."), 
      "가족처럼 너무 가까운 사이에서 벌어진 갈등은 주변 환경 전체를 우울하게 만듭니다."
    ),
    metro_opportunity: scenario(
      "같이 밥 먹는 모임", 
      "기회", 
      "구청의 훌륭한 지원 정책으로 '동네 혼자 사는 청년들 모임' 프로그램이 생겼다! 정부의 예산 지원으로 요리도 배우고 새로운 이웃 친구들도 사귀게 되었다. 나라의 보살핌 덕분에 외로움을 떨칠 가족 같은 인연을 만났다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["family", "policy", "culture", "rent"], 
      ["family", "policy"], 
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "지원 제도 덕에 새로운 인연을 맺어 씩씩해졌습니다!"), 
      localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "인연과 제도를 뒤로하고 더 먼 곳으로 홀로 훌쩍 떠났습니다.", "친구를 버리고 떠난 벌로 외로이 고립되었습니다."), 
      "정부의 올바른 정책은 도시 청년들이 이웃을 만들고 마음을 붙이게 돕습니다."
    ),
    local_opportunity: scenario(
      "우리들의 멋진 아지트", 
      "기회", 
      "마을 청년들이 낡은 빈집을 고쳐서 다 같이 모여 사는 아주 멋진 '우리의 기지'를 만들었다! 밤마다 동네 친구들이 거실에 모여 가족처럼 웃고 떠들며, 주말엔 즐겁고 신나는 축제 같은 우리만의 놀이 문화를 만끽하고 있다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["family", "culture", "policy", "job"], 
      ["family", "culture"], 
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "마을 친구들을 놔두고 세련된 도시 놀이를 찾아 떠났습니다."), 
      localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "친가족 같은 이웃들과 세상 제일 재미있게 놀고 있습니다!", "분위기는 끝내주게 좋은데 돈 버는 일은 아직 못 구했습니다."), 
      "친한 이웃과 힘을 모으면 즐겁고 독창적인 놀이 문화를 만들어낼 수 있습니다."
    ),
  },
  {
    metro: scenario(
      "어디에 내 집을 지을까", 
      "최종", 
      "거대한 빌딩 숲에서 피나는 면접 끝에 취업에 성공하고 매달 어마어마하게 비싼 방값을 내며 살아남았다. 직장에서 능력을 인정받고 월급도 꽤 올랐지만, 앞으로 평생 이렇게 높은 월세를 내며 직장 생활을 이어가야 할까?", 
      "지금까지 겪은 일들을 떠올려볼 때, 최종적으로 집을 고르기 위해 가장 중요한 조건 2가지는 무엇일까요?", 
      ["job", "rent", "environment", "traffic"], 
      ["job", "rent"], 
      metroOption("수도권 뼈 묻기", 3, [{ label: "월세", amount: 4 }], "성공적인 커리어와 높은 월세를 감당하며 도시에 뼈를 묻습니다."), 
      localOption("지방으로 유턴", 3, 1, [{ label: "월세", amount: 1 }], "치열한 직장을 뒤로하고 가벼운 방값의 고향으로 떠납니다.", "마지막 이사였지만 영 취업 결과가 좋지 않았습니다."), 
      "지금까지 쌓인 나의 돈(코인)은 나의 치열했던 취업과 방값의 기록입니다."
    ),
    local: scenario(
      "조용한 삶과 덜컹이는 마음", 
      "최종", 
      "조용한 산과 깨끗한 공기를 가진 훌륭한 환경에서 평화롭게 살았다. 스트레스 없이 숨쉬기 좋은 마을이지만, 번듯하고 돈 많이 주는 회사에서 제대로 내 능력을 펼쳐보지 못한 아쉬움이 자꾸 밟힌다. 내 꿈(취업)이 중요할까 환경이 중요할까?", 
      "지금까지 겪은 일들을 떠올려볼 때, 최종적으로 집을 고르기 위해 가장 중요한 조건 2가지는 무엇일까요?", 
      ["job", "environment", "rent", "culture"], 
      ["job", "environment"], 
      metroOption("큰 도시 상경", 3, [{ label: "월세", amount: 4 }], "마지막으로 큰 일자리의 꿈을 안고 매연 낀 번화가로 향합니다."), 
      localOption("지방 영원한 내 집", 3, 1, [{ label: "월세", amount: 1 }], "맑고 쾌적한 이곳에서 소박하게 살기로 굳게 다짐합니다.", "마지막까지 일자리가 말썽을 부려 아쉽습니다."), 
      "어디를 선택하든 그것은 자신이 가장 소중하게 생각하는 가치입니다."
    ),
    metro_crisis: scenario(
      "모든 것이 지친 어느 날", 
      "위기", 
      "매달 통장을 스쳐가는 끔찍한 방값과 월세 압박, 그리고 거리마다 매연과 꽉 막힌 차들로 가득한 탁한 공기. 매달 집세를 막으며 더러운 공기 속에서 달렸더니 내 마음까지 병들어 버렸다. 비싼 월세와 숨 막히는 환경에서 벗어나야 하지 않을까?", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["rent", "environment", "traffic", "health"], 
      ["rent", "environment"], 
      metroOption("악으로 깡으로 버티기", 3, [{ label: "월세", amount: 4 }, { label: "병원비", amount: 2 }], "눈물을 삼키며 비싼 방값과 매연 속에서 끝까지 버텨냅니다."), 
      localOption("시골 탈출", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "휴식비", amount: 1 }], "비싼 방을 빼버리고 아주 맑은 숲속으로 도망쳐 피신합니다.", "가진 돈도 없고 마음만 겨우 챙겼습니다."), 
      "월세 압박과 나쁜 환경이 겹치면 사람의 마음을 완전히 무너뜨립니다."
    ),
    local_crisis: scenario(
      "나 혼자 남겨진 거리", 
      "위기", 
      "해가 지면 동네에 볼거리도 놀거리도 없어 쥐죽은 듯 조용하다. 재미있는 영화관도 다 문을 닫았고, 무엇보다 나를 뽑아줄 회사가 아예 존재하지 않는다. 즐길 것도, 일할 곳도 없는 이 동네에서 나는 혼자 무엇을 해야 할까?", 
      "어려움을 이겨내기 위해 지금 가장 신경 쓰이는 조건 2가지는 무엇일까요?", 
      ["job", "culture", "medical", "policy"], 
      ["job", "culture"], 
      metroOption("뒤늦은 서울행", 3, [{ label: "월세", amount: 4 }, { label: "이사비", amount: 2 }], "회사와 영화관이 있는 북적이는 곳으로 서둘러 도망칩니다."), 
      localOption("지방 홀로 버티기", 2, 0.5, [{ label: "월세", amount: 1 }], "텅 빈 거리에서 꿋꿋하게 내 자리를 지킵니다.", "즐거움도 없고 일도 없어 처참하게 고립되었습니다."), 
      "일자리와 놀거리가 모두 사라진 곳은 청년들에게 가장 큰 절망을 줍니다."
    ),
    metro_opportunity: scenario(
      "완벽한 꿈의 성공", 
      "기회", 
      "피나는 노력 끝에 마침내 최고의 회사에서 아주 높은 자리를 차지했고, 정부에서 청년들을 위해 마련한 엄청난 주택 당첨 정책까지 통과했다! 훌륭한 일자리와 나라의 아낌없는 지원 정책 덕분에 나는 이 도시의 완벽한 승리자가 되었다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "policy", "rent", "culture"], 
      ["job", "policy"], 
      metroOption("수도권의 별이 되기", 3, [{ label: "주거비", amount: 5 }], "정부 정책의 힘과 성공적인 직장 타이틀을 모두 거머쥐었습니다!"), 
      localOption("고향에 금의환향", 3, 1, [{ label: "월세", amount: 1 }], "모든 영광을 안고 당당하게 고향으로 돌아가 여유를 부립니다.", "마지막에 방심하다가 예상 밖의 실수를 했습니다."), 
      "훌륭한 취업 성공과 확실한 제도적 보상은 청년의 꿈을 완성합니다."
    ),
    local_opportunity: scenario(
      "동네를 빛낸 주인공", 
      "기회", 
      "조용한 동네에서 내가 시작한 작은 장사가 크게 성공해서 돈을 쓸어 담고 있다! 게다가 내 가게가 TV 방송에 재미난 구경거리와 놀거리로 소개되면서, 전국의 사람들이 즐기러 찾아오는 명소가 되었다. 여기서 내 꿈은 환하게 빛나고 있다.", 
      "이 기회를 살리기 위해 나의 다음 선택에 가장 큰 영향을 미치는 조건 2가지는 무엇일까요?", 
      ["job", "culture", "environment", "policy"], 
      ["job", "culture"], 
      metroOption("서울 진출", 3, [{ label: "월세", amount: 4 }], "엄청난 수입을 무기 삼아 서울 번화가 무대로 진출합니다!"), 
      localOption("마을의 전설", 3, 1, [{ label: "월세", amount: 1 }, { label: "혜택", amount: -2 }], "마을을 최고의 놀거리 명소로 만들며 큰돈을 법니다!", "유명해지기만 하고 내 호주머니에 남은 돈은 없습니다."), 
      "나만의 독창적인 아이템으로 일자리와 즐길 거리를 동시에 만들어낼 수 있습니다."
    ),
  }
];

const questions = [
  "내가 처음 중요하다고 생각한 조건은 무엇이었나요?",
  "게임 중에 생각이 바뀐 조건이 있었나요?",
  "수도권에 사람이 몰리면 어떤 문제가 생기나요?",
  "지방에 사람들이 살고 싶게 만들려면 어떤 조건이 필요할까요?",
];

const transitionTemplates = {
  first: {
    metro:
      "첫 선택으로 수도권에 자리를 잡았습니다. 새 일자리와 편리한 시설은 가까워졌지만, 월세와 생활비를 직접 감당해야 합니다.",
    local:
      "첫 선택으로 지방에 자리를 잡았습니다. 생활비는 줄었고 익숙한 도움을 받을 수 있지만, 안정적인 일자리를 계속 살펴야 합니다.",
  },
  stay: {
    metro:
      "수도권 생활을 이어 가기로 했습니다. 직장과 시설은 가까운 대신, 높은 월세와 붐비는 생활을 계속 감당해야 합니다.",
    local:
      "지방 생활을 이어 가기로 했습니다. 낮은 생활비와 주변 도움은 장점이지만, 일자리와 생활 시설이 충분한지 계속 확인해야 합니다.",
  },
  move: {
    metro:
      "더 많은 일자리와 시설을 찾아 수도권으로 이동했습니다. 기회는 늘었지만, 새 월세와 경쟁 부담도 함께 커졌습니다.",
    local:
      "높은 생활비를 줄이기 위해 지방으로 이동했습니다. 지출은 가벼워졌지만, 새 일자리와 필요한 시설을 다시 찾아야 합니다.",
  },
};

const roundNarrativeTemplates = [
  null,
  {
    metro: "이번에는 혼자 사는 생활에 적응해야 합니다. 가족의 도움, 월세, 생활비를 함께 따져 봅니다.",
    local: "이번에는 익숙한 생활권의 도움을 살펴봅니다. 가족과 이웃의 도움, 낮은 월세, 일자리 걱정을 함께 따져 봅니다.",
  },
  {
    metro: "이번에는 병원과 문화시설 접근성을 비교합니다. 가까운 시설이 주는 편리함과 이용 비용을 함께 생각합니다.",
    local: "이번에는 병원과 문화시설 접근성을 비교합니다. 조용한 생활의 장점과 먼 이동의 부담을 함께 생각합니다.",
  },
  {
    metro: "이번에는 주거비가 핵심입니다. 안정적인 수입이 있어도 월세가 오르면 남는 코인이 줄어듭니다.",
    local: "이번에는 주거비와 일자리의 균형이 핵심입니다. 월세는 낮지만 안정적인 수입을 얻을 수 있는지 따져 봅니다.",
  },
  {
    metro: "이번에는 교통과 피로를 따져 봅니다. 이동망은 촘촘하지만 사람과 차가 많아 숨은 비용이 생깁니다.",
    local: "이번에는 교통과 접근성을 따져 봅니다. 길은 덜 막히지만 버스, 병원, 학교까지의 거리가 선택에 영향을 줍니다.",
  },
  {
    metro: "이번에는 정책이 일자리와 비용을 어떻게 바꾸는지 봅니다. 수도권 기회가 지방으로 나뉘면 선택지가 달라집니다.",
    local: "이번에는 정책 지원이 생활 기반을 얼마나 보완하는지 봅니다. 발표된 지원이 실제 생활에 닿는지가 중요합니다.",
  },
  {
    metro: "이번에는 산업 변화와 경쟁을 봅니다. 회사가 많은 곳일수록 기회도 많지만 준비 비용과 경쟁도 커집니다.",
    local: "이번에는 지역 산업의 가능성을 봅니다. 새 산업이 생기면 지방도 일자리와 환경을 함께 가진 선택지가 됩니다.",
  },
  {
    metro: "이번에는 인구 집중의 비용을 봅니다. 편리함 뒤에는 물가, 환경, 과밀 비용이 쌓일 수 있습니다.",
    local: "이번에는 인구 감소의 영향을 봅니다. 생활비는 낮아도 사람이 줄면 병원, 가게, 문화시설이 함께 줄 수 있습니다.",
  },
  {
    metro: "마지막 선택입니다. 수도권의 기회와 높은 비용 중 무엇을 더 중요하게 볼지 정리합니다.",
    local: "마지막 선택입니다. 지방의 낮은 비용과 생활 기반의 부족함 중 무엇을 더 중요하게 볼지 정리합니다.",
  },
];

const themeIllustrations = {
  common: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" style="height: 80px; width: auto; margin-bottom: 16px;"><rect width="200" height="80" rx="8" fill="#e9edf5"/><path d="M30,60 Q100,10 170,60" stroke="#3a72d8" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="30" cy="60" r="8" fill="#f6c344"/><circle cx="170" cy="60" r="8" fill="#e84f3d"/><text x="100" y="35" font-family="sans-serif" font-weight="bold" font-size="12" fill="#3a72d8" text-anchor="middle">출발</text></svg>`,
  metro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" style="height: 80px; width: auto; margin-bottom: 16px;"><rect width="200" height="80" rx="8" fill="#cfe8ff"/><rect x="40" y="30" width="25" height="50" fill="#3a72d8" rx="2"/><rect x="75" y="15" width="40" height="65" fill="#e84f3d" rx="2"/><rect x="125" y="40" width="30" height="40" fill="#f6c344" rx="2"/><rect x="85" y="25" width="20" height="8" fill="#fff" rx="1"/><rect x="85" y="45" width="20" height="8" fill="#fff" rx="1"/><rect x="45" y="40" width="15" height="5" fill="#fff" rx="1"/><rect x="130" y="50" width="20" height="5" fill="#fff" rx="1"/></svg>`,
  local: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" style="height: 80px; width: auto; margin-bottom: 16px;"><rect width="200" height="80" rx="8" fill="#d9f1d0"/><circle cx="60" cy="40" r="25" fill="#258f6b"/><rect x="55" y="55" width="10" height="25" fill="#8B4513"/><rect x="110" y="45" width="45" height="35" fill="#f6c344" rx="2"/><polygon points="100,45 132.5,20 165,45" fill="#e84f3d"/><rect x="120" y="55" width="10" height="10" fill="#fff" rx="1"/><rect x="140" y="55" width="10" height="25" fill="#fff" rx="1"/></svg>`,
  crisis: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" style="height: 80px; width: auto; margin-bottom: 16px;"><rect width="200" height="80" rx="8" fill="#fff0ea"/><polygon points="100,10 50,70 150,70" fill="#e84f3d" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><rect x="96" y="30" width="8" height="20" fill="#fff" rx="2"/><circle cx="100" cy="60" r="4" fill="#fff"/></svg>`,
  opportunity: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" style="height: 80px; width: auto; margin-bottom: 16px;"><rect width="200" height="80" rx="8" fill="#fffaf0"/><circle cx="100" cy="40" r="20" fill="#f6c344"/><path d="M100,5 L100,12 M100,68 L100,75 M65,40 L72,40 M128,40 L135,40 M75,15 L80,20 M120,60 L125,65 M75,65 L80,60 M120,20 L125,15" stroke="#f6c344" stroke-width="5" stroke-linecap="round"/></svg>`
};

function getRoundTheme() {
  const key = state.currentScenarioKey || "common";
  if (key.includes("crisis")) return "crisis";
  if (key.includes("opportunity")) return "opportunity";
  if (key === "metro") return "metro";
  if (key === "local") return "local";
  return "common";
}

const state = {
  phase: "notice",
  roundIndex: 0,
  coins: STARTING_COINS,
  currentRegion: null,
  currentScenarioKey: null,
  selectedFactors: [],
  pendingChoice: null,
  isRolling: false,
  rollingDiceValue: "?",
  lastRoll: null,
  consecutiveBonus: 0,
  lastResult: null,
  history: [],
};

const app = document.getElementById("app");
let audioContext = null;

function sumCosts(costs) {
  return costs.reduce((sum, item) => sum + item.amount, 0);
}

function formatCosts(costs) {
  return costs.map((item) => `${item.label} ${item.amount}코인`).join(", ");
}

function progressPercent() {
  return `${(state.roundIndex / rounds.length) * 100}%`;
}

function clampCoinLabel(value) {
  return value > 0 ? `+${value}` : String(value);
}

function getPuzzleScore(round) {
  return round.coreFactors.every((factor) => state.selectedFactors.includes(factor)) ? 1 : 0;
}

function getPuzzleQuestion(round) {
  return `이번 ${round.tag} 상황에서 지역 선택을 결정하는 핵심 조건 2개를 고르세요.`;
}

function chooseScenarioKey() {
  if (state.roundIndex === 0) return "common";
  const region = state.currentRegion || "local";
  if (state.coins <= 2 || state.lastRoll === 1) return `${region}_crisis`;
  if (state.lastRoll === 6 || state.consecutiveBonus >= 2) return `${region}_opportunity`;
  return region;
}

function getCurrentScenario() {
  state.currentScenarioKey ||= chooseScenarioKey();
  return rounds[state.roundIndex][state.currentScenarioKey];
}

function getDiceEvent(roll) {
  const events = {
    1: { label: "예상 밖 지출", delta: -1, text: "갑작스러운 병원비나 수리비가 생겼습니다." },
    2: { label: "평범한 한 달", delta: 0, text: "큰 변화 없이 계획대로 생활했습니다." },
    3: { label: "절약 성공", delta: 1, text: "알뜰하게 생활해 코인을 아꼈습니다." },
    4: { label: "작은 기회", delta: 1, text: "좋은 정보나 도움을 얻어 생활이 조금 나아졌습니다." },
    5: { label: "지원 혜택", delta: 2, text: "교통비 지원이나 생활 혜택을 받았습니다." },
    6: { label: "큰 행운", delta: 3, text: "좋은 기회가 찾아와 큰 보너스를 얻었습니다." },
  };

  return events[roll];
}

function getLocalSuccessMin(rate) {
  if (rate >= 1) return 1;
  if (rate >= 0.67) return 3;
  if (rate >= 0.5) return 4;
  if (rate >= 0.34) return 5;
  return 6;
}

function getRegionLabel(region) {
  if (!region) return "아직 정하지 않음";
  return region === "metro" ? "수도권" : "지방";
}

function labelToRegion(label) {
  return label === "수도권" ? "metro" : "local";
}

function getPreviousRegion() {
  if (state.history.length < 2) return null;
  return labelToRegion(state.history[state.history.length - 2].region);
}

function getCurrentStreak() {
  if (!state.currentRegion) return 0;

  let streak = 0;
  for (let index = state.history.length - 1; index >= 0; index -= 1) {
    if (labelToRegion(state.history[index].region) !== state.currentRegion) break;
    streak += 1;
  }
  return streak;
}

function getPathSummary() {
  if (!state.history.length) return "아직 선택 기록이 없습니다.";
  return state.history.map((item, index) => `${index + 1}R ${item.region}`).join(" → ");
}

function getNarrativeContext(round) {
  if (!state.currentRegion) {
    return {
      path: "새 생활을 시작하기 전입니다.",
      transition: "아직 어느 지역에 살지 정하지 않았습니다. 일자리, 월세, 생활 시설을 비교해 첫 거주지를 선택합니다.",
      topic: "첫 선택은 앞으로의 생활 흐름을 만드는 출발점입니다.",
    };
  }

  const previousRegion = getPreviousRegion();
  const movement = previousRegion ? (previousRegion === state.currentRegion ? "stay" : "move") : "first";
  const streak = getCurrentStreak();
  const streakText =
    streak >= 3
      ? `${getRegionLabel(state.currentRegion)}을 ${streak}라운드 연속 선택해 생활 방식이 꽤 익숙해졌습니다.`
      : `${getRegionLabel(state.currentRegion)}에서 다음 달을 준비합니다.`;
  const roundTemplate = roundNarrativeTemplates[state.roundIndex]?.[state.currentRegion] || round.scene;

  return {
    path: `선택 기록: ${getPathSummary()}`,
    transition: `${transitionTemplates[movement][state.currentRegion]} ${streakText}`,
    topic: roundTemplate,
  };
}

function getDisplayScene(round) {
  return round.scene;
}

function getChoiceLabel(type, option) {
  if (!state.currentRegion) return option.label;
  return state.currentRegion === type ? `${getRegionLabel(type)}에 계속 살기` : `${getRegionLabel(type)}으로 이동하기`;
}

function getChoiceContext(type) {
  if (!state.currentRegion) return "first";
  return state.currentRegion === type ? "stay" : "move";
}

function getIncomeText(type, option) {
  const context = getChoiceContext(type);
  if (context === "first") {
    return type === "metro" ? `예상 월급 ${option.income}코인` : `취업하면 월급 ${option.income}코인`;
  }
  if (context === "stay") {
    return type === "metro" ? `기존 일자리 수입 ${option.income}코인` : `지역 생활 수입 ${option.income}코인`;
  }
  return type === "metro" ? `수도권 이동 후 수입 ${option.income}코인` : `지방 이동 후 수입 ${option.income}코인`;
}

function getStabilityText(type, option) {
  const context = getChoiceContext(type);
  if (type === "metro") {
    if (context === "stay") return "기존 일자리 유지";
    if (context === "move") return "수도권 일자리 확보";
    return "수도권 취업 가능";
  }

  if (option.employmentRate >= 1) {
    if (context === "stay") return "지역 수입 안정";
    if (context === "move") return "지방 일자리 확보";
    return "지방 일자리 확보";
  }

  const chance = Math.round(option.employmentRate * 100);
  if (context === "stay") return `이번 달 수입 확보 확률 ${chance}%`;
  if (context === "move") return `지방 이동 후 취업 확률 ${chance}%`;
  return `지방 취업 확률 ${chance}%`;
}

function getChoiceTradeoff(type, option, round) {
  const context = getChoiceContext(type);
  const costs = option.costs.map((item) => item.label).join(", ") || "생활비";
  const isStay = context === "stay";
  const isMetro = type === "metro";
  const benefits = [];
  const burdens = [];

  for (const factor of round.coreFactors) {
    if (factor === "job") {
      if (isMetro) benefits.push(isStay ? "기존 일자리와 안정적 수입" : "새 일자리 기회와 안정적 수입");
      else if (option.employmentRate >= 1) benefits.push(isStay ? "지역 일자리 유지" : "지역 일자리 기회");
      else burdens.push(isStay ? "지역 수입 불안정" : "새 일자리 불확실");
    }

    if (factor === "rent") {
      const rentCost = option.costs.find((item) => item.label.includes("월세") || item.label.includes("주거"));
      if (rentCost) {
        if (rentCost.amount <= 1) {
          benefits.push("낮은 월세 부담");
        } else if (rentCost.amount >= 3) {
          burdens.push("높은 월세 부담");
        } else if (rentCost.amount === 2) {
          if (isMetro && context === "first") {
            burdens.push("오르기 시작한 월세 부담");
          } else {
            benefits.push("낮은 월세 부담");
          }
        }
      }
    }

    if (factor === "medical") {
      if (isMetro) benefits.push("병원 접근성");
      else burdens.push("병원 이용 거리 부담");
    }

    if (factor === "culture") {
      if (isMetro) benefits.push("문화시설 이용 기회");
      else benefits.push("지역 문화와 공동체 활동");
    }

    if (factor === "traffic") {
      if (isMetro) burdens.push("붐비는 이동과 교통비");
      else burdens.push("교통편 부족과 이동 시간");
    }

    if (factor === "family") {
      if (isMetro) burdens.push("가족 도움을 받기 어려움");
      else benefits.push("가족과 이웃의 도움");
    }

    if (factor === "policy") {
      benefits.push("정책 지원 활용 가능성");
    }

    if (factor === "environment") {
      if (isMetro) burdens.push("소음과 환경 부담");
      else benefits.push("쾌적한 환경");
    }

    if (factor === "prices") {
      if (isMetro) burdens.push("높은 물가와 비용");
      else benefits.push("상대적으로 낮은 생활비");
    }
  }

  if (!benefits.length) benefits.push(isMetro ? "수도권 조건 활용" : "지방 조건 활용");
  if (!burdens.length) burdens.push("선택에 따른 비용");

  return {
    benefit: `이익: ${benefits.slice(0, 2).join(", ")}`,
    cost: `감수: ${burdens.slice(0, 2).join(", ")}`,
  };
}

function getDiceGuideText(type, option) {
  const context = getChoiceContext(type);
  if (type === "metro") {
    if (context === "stay") return "기존 수도권 일자리를 유지하며 생활비 이벤트를 확인합니다.";
    if (context === "move") return "수도권으로 이동해 일자리를 얻고 생활비 이벤트를 확인합니다.";
    return "수도권 일자리를 얻고 생활비 이벤트를 확인합니다.";
  }

  if (option.employmentRate >= 1) {
    if (context === "stay") return "이번 라운드는 지역 수입이 안정적입니다. 주사위로 생활비 이벤트만 확인합니다.";
    if (context === "move") return "지방으로 이동해 일자리를 확보했습니다. 주사위로 생활비 이벤트만 확인합니다.";
    return "지방 일자리를 확보했습니다. 주사위로 생활비 이벤트만 확인합니다.";
  }

  const successMin = getLocalSuccessMin(option.employmentRate);
  if (context === "stay") return `지역에서 계속 지내지만 수입은 불안정합니다. 주사위 ${successMin} 이상이면 이번 달 수입을 얻습니다.`;
  if (context === "move") return `지방으로 이동한 뒤 새 일자리를 찾아야 합니다. 주사위 ${successMin} 이상이면 취업에 성공합니다.`;
  return `지방 일자리는 주사위 ${successMin} 이상이면 구할 수 있습니다.`;
}

function getAudioContext() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

function playTone(frequency, startDelay, duration, volume = 0.08) {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const startAt = context.currentTime + startDelay;
  const endAt = startAt + duration;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.02);
}

function playRollTick(step) {
  playTone(180 + step * 18, 0, 0.045, 0.045);
}

function playResultSound(roll) {
  if (roll >= 5) {
    playTone(520, 0, 0.08);
    playTone(720, 0.09, 0.1);
    playTone(920, 0.19, 0.14);
    return;
  }

  if (roll <= 2) {
    playTone(260, 0, 0.1);
    playTone(180, 0.12, 0.16);
    return;
  }

  playTone(420, 0, 0.08);
  playTone(560, 0.1, 0.11);
}

function render() {
  if (state.phase === "notice") renderNotice();
  if (state.phase === "intro") renderIntro();
  if (state.phase === "choice") renderChoice();
  if (state.phase === "dice") renderDice();
  if (state.phase === "reveal") renderReveal();
  if (state.phase === "ending") renderEnding();
}

function renderNotice() {
  app.innerHTML = `
    <section class="notice-screen">
      <header class="notice-header">
        <p class="subject">사회 5학년 · 인구 불균형 체험 놀이</p>
        <h1>활동 안내</h1>
      </header>

      <section class="notice-section">
        <h2>활동 방법</h2>
        <div class="notice-grid">
          <article>
            <strong>상황 읽기</strong>
            <p>매 라운드마다 새로운 사회 상황을 읽고 어떤 문제가 생겼는지 생각합니다.</p>
          </article>
          <article>
            <strong>조건 카드 2개 고르기</strong>
            <p>상황과 관련이 깊다고 생각되는 조건 카드 2개를 고릅니다.</p>
          </article>
          <article>
            <strong>수도권 또는 지방 선택하기</strong>
            <p>고른 조건을 떠올리며 내가 살고 싶은 지역을 선택합니다.</p>
          </article>
          <article>
            <strong>주사위 굴리기</strong>
            <p>주사위 결과에 따라 취업, 행운, 예상 밖 지출이 달라집니다.</p>
          </article>
          <article>
            <strong>결과 확인하기</strong>
            <p>수입, 지출, 분석 보너스, 주사위 결과를 보고 코인이 어떻게 바뀌었는지 확인합니다.</p>
          </article>
          <article>
            <strong>생각 나누기</strong>
            <p>마지막에는 내가 왜 그런 선택을 했는지 이야기합니다.</p>
          </article>
        </div>
      </section>

      <section class="notice-section">
        <h2>조건 카드 규칙</h2>
        <p>
          조건 카드는 정답을 맞혀야만 지나가는 문제가 아닙니다.
          상황을 읽고 “이번 선택에서 무엇이 중요할까?”를 먼저 생각하게 만드는 카드입니다.
        </p>
        <p>
          조건 카드 2개를 고르면 지역을 선택할 수 있습니다.
          그중 이번 상황의 핵심 조건을 잘 고르면 결과에서 분석 보너스 +1코인을 받습니다.
        </p>
      </section>

      <footer class="notice-footer">
        <button class="big-action" type="button" data-action="notice-next">다음</button>
      </footer>
    </section>
  `;
}

function renderShell(content) {
  app.innerHTML = `
    <section class="game-screen">
      <header class="top-bar">
        <div>
          <p class="subject">사회 5학년 · 인구 불균형 체험 놀이</p>
          <h1>나의 지역 선택 게임</h1>
        </div>
        <div class="coin-wallet" aria-label="현재 보유 코인">
          <span>보유 코인</span>
          <strong>${state.coins}</strong>
          <small>${getRegionLabel(state.currentRegion)}</small>
        </div>
      </header>
      <div class="board" aria-label="라운드 진행 상황">
        ${ROUND_TAGS
          .map(
            (tag, index) => `
              <div class="board-step ${index < state.roundIndex ? "done" : ""} ${index === state.roundIndex ? "active" : ""}">
                <span>${index + 1}</span>
                <small>${tag}</small>
              </div>
            `,
          )
          .join("")}
        <div class="board-line"><span style="width:${progressPercent()}"></span></div>
      </div>
      ${content}
    </section>
  `;
}

function renderIntro() {
  renderShell(`
    <section class="intro-layout">
      <div class="intro-copy">
        <p class="round-kicker">START</p>
        <h2>어디에 살지 선택하며<br />인구 불균형을 체험해 봅니다.</h2>
        <p>
          9개의 상황을 지나며 수도권과 지방 중 어디에 살지 선택합니다.
          선택에 따라 일자리, 월세, 의료, 문화, 교통, 정책 조건이 달라지고 보유 코인도 변합니다.
        </p>
      </div>
      <div class="start-panel">
        <div class="player-card">
          <span>시작 코인</span>
          <strong>${STARTING_COINS}</strong>
        </div>
        <div class="quick-rule">
          <span>총 라운드</span>
          <strong>${rounds.length}개</strong>
        </div>
        <button class="big-action" type="button" data-action="start">게임 시작</button>
      </div>
    </section>
  `);
}

function renderChoice() {
  const round = getCurrentScenario();
  const ready = state.selectedFactors.length === REQUIRED_FACTORS;
  const narrative = getNarrativeContext(round);
  const locationText = state.currentRegion
    ? `현재 거주지: ${getRegionLabel(state.currentRegion)}. 이번 라운드에서는 계속 살지, 다른 지역으로 이동할지 결정합니다.`
    : "아직 거주지를 정하지 않았습니다. 첫 거주지를 선택합니다.";

  const theme = getRoundTheme();
  const illustrationSvg = themeIllustrations[theme] || themeIllustrations.common;

  renderShell(`
    <section class="round-layout">
      <article class="story-panel">
        ${illustrationSvg}
        <p class="round-kicker">ROUND ${state.roundIndex + 1}</p>
        <h2>${round.title}</h2>
        <p class="location-note">${locationText}</p>
        <div class="path-context" aria-label="선택 기록과 이어지는 장면">
          <strong>${narrative.path}</strong>
          <p>${narrative.transition}</p>
          <p>${narrative.topic}</p>
        </div>
        <p>${getDisplayScene(round)}</p>
        <div class="question-strip">${getPuzzleQuestion(round)}</div>
      </article>
      <section class="puzzle-panel">
        <div class="puzzle-head">
          <h3>조건 카드 퍼즐</h3>
          <span>${state.selectedFactors.length}/${REQUIRED_FACTORS}</span>
        </div>
        <div class="factor-grid">
          ${round.factors
            .map(
              (factor) => `
                <button class="factor-chip ${state.selectedFactors.includes(factor) ? "selected" : ""}" type="button" data-factor="${factor}">
                  <strong>${factorLabels[factor]}</strong>
                  <small>${factorDescriptions[factor]}</small>
                </button>
              `,
            )
            .join("")}
        </div>
        <p class="puzzle-help">${ready ? "선택 완료! 이제 아래에서 지역을 고르세요." : "조건 카드는 지역 선택의 원인 후보입니다. 상황과 선택지를 비교해 핵심 2개를 고르세요."}</p>
      </section>
      <section class="choice-grid ${ready ? "" : "locked"}">
        ${renderChoiceButton("metro", round.metro, "city", round)}
        ${renderChoiceButton("local", round.local, "town", round)}
      </section>
    </section>
  `);
}

function renderChoiceButton(type, option, icon, round) {
  const tradeoff = getChoiceTradeoff(type, option, round);

  return `
    <button class="choice-card ${type}" type="button" data-choice="${type}">
      <span class="choice-icon ${icon}"></span>
      <strong>${getChoiceLabel(type, option)}</strong>
      <span>${getIncomeText(type, option)}</span>
      <span class="choice-benefit">${tradeoff.benefit}</span>
      <span class="choice-cost">${tradeoff.cost}</span>
      <span>지출: ${formatCosts(option.costs)}</span>
      <span>${getStabilityText(type, option)}</span>
    </button>
  `;
}

function renderDice() {
  const round = getCurrentScenario();
  const option = round[state.pendingChoice];
  const employmentText = getDiceGuideText(state.pendingChoice, option);

  renderShell(`
    <section class="dice-layout">
      <article class="dice-story">
        <p class="round-kicker">ROUND ${state.roundIndex + 1}</p>
        <h2>${getChoiceLabel(state.pendingChoice, option)}</h2>
        <p>${employmentText}</p>
        <p>주사위 눈에 따라 생활비 이벤트가 추가됩니다. 운도 현실의 일부처럼 작용합니다.</p>
      </article>
      <aside class="dice-panel">
        <div class="dice-face ${state.isRolling ? "rolling" : ""}" aria-label="주사위">${state.rollingDiceValue}</div>
        <button class="big-action" type="button" data-action="roll" ${state.isRolling ? "disabled" : ""}>
          ${state.isRolling ? "굴리는 중..." : "주사위 굴리기"}
        </button>
      </aside>
    </section>
  `);
}

function renderReveal() {
  const result = state.lastResult;
  const isFinal = state.roundIndex >= rounds.length;
  const selectedFactorText = result.selectedFactors.map((factor) => factorLabels[factor]).join(", ");
  const coreFactorText = result.coreFactors.map((factor) => factorLabels[factor]).join(", ");
  const bonusText =
    result.bonus > 0
      ? "상황의 핵심 조건을 정확히 짚어 분석 보너스 1코인을 받았습니다."
      : "조건 카드는 골랐지만, 이번 상황의 핵심 조건과는 조금 달랐습니다.";

  renderShell(`
    <section class="result-layout">
      <article class="result-panel ${result.delta >= 0 ? "gain" : "loss"}">
        <p class="round-kicker">RESULT</p>
        <h2>${result.region} 선택 결과</h2>
        <div class="result-number">${clampCoinLabel(result.delta)}코인</div>
        <p>${result.message}</p>
        <p class="bonus-note">${bonusText}</p>
        <div class="factor-result">
          <div>
            <span>내가 고른 조건</span>
            <strong>${selectedFactorText}</strong>
          </div>
          <div>
            <span>실제 핵심 조건</span>
            <strong>${coreFactorText}</strong>
          </div>
        </div>
        <dl class="calc-list">
          <div><dt>수입</dt><dd>${result.income}코인</dd></div>
          <div><dt>지출</dt><dd>${result.costText}</dd></div>
          <div><dt>분석 보너스</dt><dd>${result.bonus}코인</dd></div>
          <div><dt>주사위</dt><dd>${result.roll} · ${result.diceLabel} (${clampCoinLabel(result.eventDelta)}코인)</dd></div>
          <div><dt>현재 보유</dt><dd>${state.coins}코인</dd></div>
        </dl>
      </article>
      <aside class="insight-panel">
        <h3>생각해 보기</h3>
        <p>${result.insight}</p>
        <button class="big-action" type="button" data-action="${isFinal ? "ending" : "next"}">
          ${isFinal ? "최종 결과 보기" : "다음 라운드"}
        </button>
      </aside>
    </section>
  `);
}

function renderEnding() {
  const totalDelta = state.coins - STARTING_COINS;
  const endingTitle =
    state.coins >= 10 ? "균형 감각이 좋은 선택가" : state.coins >= 5 ? "조건을 읽는 이동자" : "비용을 크게 겪은 생존자";

  renderShell(`
    <section class="ending-layout">
      <article class="ending-summary">
        <p class="round-kicker">FINISH</p>
        <h2>${endingTitle}</h2>
        <p>시작 코인 ${STARTING_COINS}개에서 ${state.coins}개로 마쳤습니다. 총 변화는 ${clampCoinLabel(totalDelta)}코인입니다.</p>
        <div class="timeline">
          ${state.history
            .map(
              (item, index) => `
                <div class="timeline-item">
                  <span>R${index + 1}</span>
                  <strong>${item.region}</strong>
                  <em>${clampCoinLabel(item.delta)}코인</em>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
      <aside class="reflection-panel">
        <h3>정리 질문</h3>
        <ol>
          ${questions.map((question) => `<li>${question}</li>`).join("")}
        </ol>
        <button class="sub-action" type="button" data-action="restart">다시 하기</button>
      </aside>
    </section>
  `);
}

function chooseRegion(type) {
  if (state.selectedFactors.length !== REQUIRED_FACTORS) return;

  state.pendingChoice = type;
  state.rollingDiceValue = "?";
  state.isRolling = false;
  state.phase = "dice";
  render();
}

function startDiceRoll() {
  if (!state.pendingChoice || state.isRolling) return;

  state.isRolling = true;
  state.rollingDiceValue = 1;
  render();

  let step = 0;
  const totalSteps = 15;
  const finalRoll = Math.floor(Math.random() * 6) + 1;
  const timer = window.setInterval(() => {
    step += 1;
    state.rollingDiceValue = step === totalSteps ? finalRoll : Math.floor(Math.random() * 6) + 1;
    playRollTick(step);
    render();

    if (step === totalSteps) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        playResultSound(finalRoll);
        resolveDiceRoll(finalRoll);
      }, 420);
    }
  }, 95);
}

function resolveDiceRoll(roll) {
  if (!state.pendingChoice) return;

  const round = getCurrentScenario();
  const type = state.pendingChoice;
  const option = round[type];
  const event = getDiceEvent(roll);
  const costs = sumCosts(option.costs);
  const bonus = getPuzzleScore(round);
  let employed = true;
  let income = option.income;
  let message = option.result;

  if (type === "local") {
    employed = roll >= getLocalSuccessMin(option.employmentRate);
    income = employed ? option.income : 0;
    message = employed ? option.success : option.fail;
  }

  const delta = income - costs + bonus + event.delta;
  state.coins += delta;
  state.consecutiveBonus = bonus > 0 ? state.consecutiveBonus + 1 : 0;
  state.lastRoll = roll;
  state.lastResult = {
    region: type === "metro" ? "수도권" : "지방",
    actionLabel: getChoiceLabel(type, option),
    delta,
    income,
    bonus,
    roll,
    scenarioKey: state.currentScenarioKey,
    diceLabel: event.label,
    eventDelta: event.delta,
    selectedFactors: [...state.selectedFactors],
    coreFactors: [...round.coreFactors],
    costText: formatCosts(option.costs),
    message: `${message} ${event.text}`,
    insight: round.insight,
  };
  state.history.push({
    region: state.lastResult.region,
    delta,
    employed,
    bonus,
    roll,
    factors: [...state.selectedFactors],
    coins: state.coins,
  });
  state.currentRegion = type;
  state.roundIndex += 1;
  state.currentScenarioKey = null;
  state.pendingChoice = null;
  state.isRolling = false;
  state.rollingDiceValue = "?";
  state.phase = "reveal";
  render();
}

function toggleFactor(factor) {
  if (state.selectedFactors.includes(factor)) {
    state.selectedFactors = state.selectedFactors.filter((item) => item !== factor);
    render();
    return;
  }

  if (state.selectedFactors.length >= REQUIRED_FACTORS) return;
  state.selectedFactors.push(factor);
  render();
}

function handleAction(action) {
  if (action === "notice-next") {
    state.phase = "intro";
    render();
  }
  if (action === "start") {
    state.phase = "choice";
    state.selectedFactors = [];
    state.currentScenarioKey = null;
    state.currentRegion = null;
    render();
  }
  if (action === "next") {
    state.phase = "choice";
    state.selectedFactors = [];
    state.currentScenarioKey = null;
    state.pendingChoice = null;
    state.isRolling = false;
    state.rollingDiceValue = "?";
    render();
  }
  if (action === "roll") {
    startDiceRoll();
  }
  if (action === "ending") {
    state.phase = "ending";
    render();
  }
  if (action === "restart") {
    state.phase = "notice";
    state.roundIndex = 0;
    state.coins = STARTING_COINS;
    state.currentRegion = null;
    state.currentScenarioKey = null;
    state.selectedFactors = [];
    state.pendingChoice = null;
    state.isRolling = false;
    state.rollingDiceValue = "?";
    state.lastRoll = null;
    state.consecutiveBonus = 0;
    state.lastResult = null;
    state.history = [];
    render();
  }
}

app.addEventListener("click", (event) => {
  const factor = event.target.closest("[data-factor]");
  if (factor) {
    toggleFactor(factor.dataset.factor);
    return;
  }

  const choice = event.target.closest("[data-choice]");
  if (choice) {
    chooseRegion(choice.dataset.choice);
    return;
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    handleAction(action.dataset.action);
  }
});

render();
