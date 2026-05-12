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
      "첫 거주지 선택",
      "시작",
      "수도권에 큰 AI 반도체 공장이 생겨 새 일자리가 늘었습니다. 많은 사람이 공장 근처로 이사 오면서 원룸과 아파트 월세도 오르기 시작했습니다. 지방은 월세가 낮지만 새 일자리가 적다는 걱정이 있습니다.",
      "이번 상황과 관련 깊은 조건 2개를 고르세요.",
      ["job", "rent", "medical", "culture"],
      ["job", "rent"],
      metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }], "공장 근처 일자리를 얻어 월급을 받았습니다."),
      localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }], "지방에서 일자리를 구하고 낮은 월세 덕분에 코인을 아꼈습니다.", "지방의 낮은 월세는 좋았지만 새 일자리를 구하지 못했습니다."),
      "인구 이동의 첫 이유는 일자리와 생활비에서 시작되는 경우가 많습니다.",
    ),
  },
  {
    metro: scenario(
      "수도권 생활 적응",
      "정착",
      "수도권에서 혼자 지내다 보니 밥, 빨래, 생활용품을 직접 챙겨야 합니다. 가족이 멀리 있어 급할 때 도움을 받기 어렵습니다. 월세와 생활비가 매달 빠져나가 코인이 빨리 줄어듭니다.",
      "이번 생활 변화와 관련 깊은 조건 2개를 고르세요.",
      ["family", "rent", "culture", "environment"],
      ["family", "rent"],
      metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "생활비", amount: 1 }], "수도권 생활을 이어갔지만 혼자 내야 할 비용이 늘었습니다."),
      localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "가족 가까이 이동해 생활비 도움을 받았습니다.", "지방으로 이동했지만 새 일자리를 바로 구하지 못했습니다."),
      "새 지역에 정착할 때는 가족의 도움과 주거비가 큰 영향을 줍니다.",
    ),
    local: scenario(
      "익숙한 동네의 도움",
      "정착",
      "지방에서는 가족과 이웃이 가까워 식사나 돌봄 도움을 받을 수 있습니다. 익숙한 동네라 새로 살림을 준비할 일이 적습니다. 월세가 낮아 매달 나가는 코인이 수도권보다 적습니다.",
      "이번 생활 안정과 관련 깊은 조건 2개를 고르세요.",
      ["family", "rent", "job", "culture"],
      ["family", "rent"],
      metroOption("수도권 이동", 3, [{ label: "월세", amount: 2 }, { label: "정착비", amount: 1 }], "수도권으로 이동해 일자리를 얻었지만 정착 비용이 들었습니다."),
      localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "익숙한 동네에서 도움을 받으며 지냈습니다.", "지방에 계속 살았지만 안정적인 일자리를 찾지 못했습니다."),
      "익숙한 생활권과 낮은 월세는 지방 생활의 중요한 장점입니다.",
    ),
    crisis: scenario(
      "갑작스러운 정착비",
      "위기",
      "갑자기 이사하거나 필요한 물건을 사야 하는 일이 생겼습니다. 가까이 도와줄 가족이 없으면 모든 일을 혼자 해결해야 합니다. 월세까지 내고 나니 남은 코인이 많지 않습니다.",
      "이번 위기와 관련 깊은 조건 2개를 고르세요.",
      ["family", "rent", "environment", "culture"],
      ["family", "rent"],
      metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }, { label: "정착비", amount: 1 }], "수도권에서 버텼지만 정착 비용이 크게 들었습니다."),
      localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "정착비", amount: 1 }], "낮은 월세 덕분에 정착비 부담을 줄였습니다.", "정착비는 줄였지만 일자리를 구하지 못했습니다."),
      "위기 상황에서는 가까운 도움과 고정 지출이 특히 중요해집니다.",
    ),
    opportunity: scenario(
      "주변 도움",
      "기회",
      "가족이나 이웃이 생활에 필요한 정보를 알려줍니다. 지역 기관에서 청년 생활 지원 안내문도 받았습니다. 도움을 잘 활용하면 정착 비용을 줄일 수 있습니다.",
      "이번 기회와 관련 깊은 조건 2개를 고르세요.",
      ["family", "policy", "culture", "environment"],
      ["family", "policy"],
      metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }], "도움 정보를 활용해 수도권 생활 비용을 조금 줄였습니다."),
      localOption("지방 선택", 2, 1, [{ label: "월세", amount: 1 }], "주변 도움과 지원 정보를 활용해 안정적으로 지냈습니다.", "이번 라운드는 주변 도움으로 모두 취업합니다."),
      "정보와 지원을 얻으면 같은 지역에서도 생활 결과가 달라질 수 있습니다.",
    ),
  },
  {
    metro: scenario("가까운 병원과 문화시설", "의료", "수도권에는 큰 병원과 전문 병원이 가까이 있습니다. 주말에는 전시, 공연, 체험 행사도 쉽게 찾아볼 수 있습니다. 편리한 시설이 많지만 이용하려는 사람도 많습니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["medical", "culture", "prices", "environment"], ["medical", "culture"], metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }], "병원과 문화시설을 가까이 이용했습니다."), localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "지방에서 생활비를 줄였지만 시설 이용에는 이동이 필요했습니다.", "지방으로 이동했지만 일자리를 구하지 못하고 이동비도 들었습니다."), "생활 인프라는 지역 선택의 중요한 이유가 됩니다."),
    local: scenario("먼 병원과 부족한 문화시설", "의료", "지방에서는 큰 병원이 멀리 있어 진료를 받으려면 다른 지역으로 가야 할 때가 있습니다. 보고 싶은 공연이나 전시는 자주 열리지 않습니다. 평소 생활은 조용하지만 이용할 수 있는 시설이 적습니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["medical", "culture", "traffic", "family"], ["medical", "culture"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 2 }], "수도권으로 이동해 병원과 문화시설을 쉽게 이용했습니다."), localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "지방에 남아 생활비는 아꼈지만 시설 이용에는 비용이 들었습니다.", "지방에 남았지만 일자리와 시설 이용 모두 어려웠습니다."), "지방 생활에서는 시설 접근성이 선택에 영향을 줄 수 있습니다."),
    crisis: scenario("병원 가는 날", "위기", "갑자기 몸이 아파 병원에 가야 합니다. 가까운 병원 예약이 어렵거나, 큰 병원까지 멀리 이동해야 할 수 있습니다. 버스나 기차를 타면 시간과 교통비가 더 듭니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["medical", "traffic", "culture", "policy"], ["medical", "traffic"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }, { label: "진료비", amount: 1 }], "진료는 빨랐지만 비용이 들었습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 2 }], "먼 병원까지 이동했지만 생활비는 낮게 유지했습니다.", "병원 이동비가 들고 일자리도 구하지 못했습니다."), "아플 때는 의료와 교통이 생활 안정에 바로 연결됩니다."),
    opportunity: scenario("새 진료소와 문화센터", "기회", "지역에 작은 진료소와 공공 문화센터가 새로 생겼습니다. 지방자치단체에서 주민 생활 시설을 늘리는 사업을 시작했습니다. 아직 크지는 않지만 가까운 곳에서 이용할 수 있는 시설이 늘었습니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["policy", "medical", "culture", "prices"], ["policy", "medical"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }], "수도권의 기존 시설을 이용하며 안정적으로 지냈습니다."), localOption("지방 선택", 3, 1, [{ label: "월세", amount: 1 }], "새 생활 시설 덕분에 지방 생활이 편리해졌습니다.", "이번 라운드는 시설 확충으로 모두 취업합니다."), "정책으로 생활 시설이 늘면 지역의 매력이 달라집니다."),
  },
  {
    metro: scenario("월세가 오른 방", "주거", "수도권 회사 근처 방을 찾는 사람이 계속 늘고 있습니다. 월급은 안정적으로 받지만 월세가 올라 남는 코인이 줄어듭니다. 회사와 가까운 집일수록 더 비싸졌습니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["job", "rent", "culture", "family"], ["job", "rent"], metroOption("수도권 유지", 3, [{ label: "폭등 월세", amount: 4 }], "월급은 받았지만 월세가 크게 부담되었습니다."), localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "낮은 월세 덕분에 부담을 줄였습니다.", "월세는 낮았지만 일자리를 구하지 못했습니다."), "일자리와 월세는 서로 연결되어 생활 결과를 바꿉니다."),
    local: scenario("낮은 월세와 일자리 걱정", "주거", "지방에서는 월세가 낮아 매달 나가는 코인이 적습니다. 하지만 원하는 일을 찾을 수 있는 회사가 많지 않습니다. 생활비는 아낄 수 있지만 안정적인 월급이 걱정됩니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["rent", "job", "medical", "culture"], ["rent", "job"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "수도권에서 일자리를 얻었지만 월세가 높았습니다."), localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "지방의 낮은 월세 덕분에 코인을 아꼈습니다.", "일자리가 적어 수입을 얻지 못했습니다."), "낮은 생활비와 안정적인 수입은 함께 살펴야 합니다."),
    crisis: scenario("계약 갱신", "위기", "집 계약을 다시 해야 하는데 월세가 올랐습니다. 마트에서 사는 음식과 생활용품 가격도 전보다 비싸졌습니다. 같은 생활을 해도 코인이 더 빨리 줄어듭니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["rent", "prices", "traffic", "environment"], ["rent", "prices"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 4 }, { label: "물가", amount: 1 }], "월급을 받아도 월세와 물가 부담이 컸습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "물가", amount: 1 }], "낮은 월세로 위기를 줄였습니다.", "지출은 줄였지만 일자리 수입이 없었습니다."), "고정 지출이 오르면 지역 선택이 더 현실적인 문제가 됩니다."),
    opportunity: scenario("저렴한 집 발견", "기회", "조금 외곽에 월세가 낮은 집을 찾았습니다. 대신 학교나 직장까지 가는 시간이 더 길어질 수 있습니다. 집값은 줄지만 이동이 불편해질 수 있습니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["rent", "traffic", "culture", "policy"], ["rent", "traffic"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }, { label: "교통비", amount: 1 }], "외곽 집을 골라 월세를 줄였습니다."), localOption("지방 선택", 2, 1, [{ label: "월세", amount: 1 }], "낮은 주거비로 안정적으로 생활했습니다.", "이번 라운드는 좋은 집 정보로 모두 취업합니다."), "좋은 집을 찾는 일은 비용과 이동 시간을 함께 바꿉니다."),
  },
  {
    metro: scenario("붐비는 출퇴근길", "교통", "아침마다 지하철과 버스가 사람들로 가득 찹니다. 도로에는 차가 많아 소음과 미세먼지도 심해졌습니다. 집에 돌아오면 이동만으로도 피곤합니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["traffic", "environment", "culture", "family"], ["traffic", "environment"], metroOption("수도권 유지", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 1 }], "수도권에 남아 일했지만 이동 피로와 교통비가 들었습니다."), localOption("지방 이동", 2, 0.5, [{ label: "월세", amount: 1 }], "복잡한 출퇴근에서 벗어나 생활했습니다.", "교통은 편해졌지만 일자리를 구하지 못했습니다."), "과밀은 교통과 환경 문제로 이어질 수 있습니다."),
    local: scenario("적은 교통편", "교통", "지방은 길이 덜 막히지만 버스가 자주 오지 않습니다. 큰 병원에 가려면 시간을 맞춰 멀리 이동해야 합니다. 차가 없으면 필요한 곳에 가기 불편할 때가 있습니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["traffic", "medical", "rent", "environment"], ["traffic", "medical"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "수도권으로 이동해 병원 접근성이 좋아졌습니다."), localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "지방에 남아 생활비는 아꼈지만 이동이 불편했습니다.", "교통비가 들고 일자리도 구하지 못했습니다."), "교통편은 의료와 생활 시설 이용에도 영향을 줍니다."),
    crisis: scenario("먼 이동", "위기", "갑자기 멀리 이동해야 하는 일이 생겼습니다. 기차표와 버스비가 올라 예상보다 많은 코인이 필요합니다. 이동 시간이 길어 하루 계획도 흐트러집니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["traffic", "prices", "family", "culture"], ["traffic", "prices"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }, { label: "교통비", amount: 1 }], "교통비가 들었지만 일을 이어갔습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 2 }], "먼 이동 때문에 코인이 줄었습니다.", "이동비가 들고 일자리도 얻지 못했습니다."), "돌발 이동은 시간과 비용을 함께 흔듭니다."),
    opportunity: scenario("새 노선", "기회", "새 버스 노선이나 철도 연결 계획이 발표되었습니다. 이동 시간이 줄어들면 학교, 병원, 일자리에 가기 쉬워집니다. 지역 주민들은 새 노선이 빨리 생기길 기대합니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["policy", "traffic", "medical", "culture"], ["policy", "traffic"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }], "교통 정보를 활용해 이동 부담을 줄였습니다."), localOption("지방 선택", 3, 1, [{ label: "월세", amount: 1 }], "새 교통 계획 덕분에 지방 생활의 가능성이 커졌습니다.", "이번 라운드는 새 노선 덕분에 모두 취업합니다."), "교통 정책은 지역 간 거리감을 줄일 수 있습니다."),
  },
  {
    metro: scenario("일자리 분산", "정책", "정부가 수도권 집중을 줄이기 위해 공공기관 일부를 지방으로 옮기려 합니다. 기업들도 지방 이전 지원을 받을 수 있다는 소식을 듣습니다. 수도권에만 있던 일자리 일부가 다른 지역으로 나뉘기 시작합니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["policy", "job", "culture", "family"], ["policy", "job"], metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }], "수도권 일자리는 유지했지만 일부 기회가 지방으로 옮겨갔습니다."), localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "정책으로 생긴 지방 일자리를 얻었습니다.", "이번 라운드는 정책 효과로 모두 취업합니다."), "정책은 일자리의 위치를 바꿀 수 있습니다."),
    local: scenario("지방 지원 발표", "정책", "지방에 병원을 늘리고 생활 시설을 보완하는 계획이 발표되었습니다. 주민들은 가까운 곳에서 진료받을 수 있기를 기대합니다. 아직 모든 것이 바뀐 것은 아니지만 지원이 시작되었습니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["policy", "medical", "traffic", "culture"], ["policy", "medical"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 3 }], "수도권의 기존 의료 시설을 이용했습니다."), localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "지원 발표 덕분에 지방 생활의 기대가 커졌습니다.", "이번 라운드는 지원 정책으로 모두 취업합니다."), "정책은 부족한 생활 기반을 보완하는 출발점이 됩니다."),
    crisis: scenario("느린 정책", "위기", "지원 정책은 발표되었지만 버스 노선은 아직 그대로입니다. 병원이나 학교를 이용하려면 여전히 멀리 이동해야 합니다. 정책이 실제 생활에 닿기까지 시간이 걸립니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["policy", "traffic", "medical", "prices"], ["policy", "traffic"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 4 }], "수도권의 시설은 이용했지만 비용이 컸습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 1 }], "정책을 기다리며 지방에 남았습니다.", "정책 변화가 늦어 일자리도 놓쳤습니다."), "정책은 발표보다 실제 실행이 중요합니다."),
    opportunity: scenario("지원금 선정", "기회", "청년 주거 지원이나 정착 지원금에 선정되었습니다. 월세 부담을 줄일 수 있어 남는 코인이 늘어납니다. 지원 제도를 잘 알면 생활이 조금 안정됩니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["policy", "rent", "job", "environment"], ["policy", "rent"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 2 }], "지원금으로 높은 월세 부담을 줄였습니다."), localOption("지방 선택", 3, 1, [{ label: "월세", amount: 1 }], "지원금과 낮은 월세 덕분에 안정적으로 생활했습니다.", "이번 라운드는 지원금으로 모두 취업합니다."), "지원 제도는 개인의 선택을 현실적으로 바꿉니다."),
  },
  {
    metro: scenario("치열한 경쟁", "산업", "수도권에는 회사가 많지만 지원자도 많습니다. 면접 준비, 학원, 자격증에 드는 비용이 늘어납니다. 좋은 일자리를 얻기 위한 경쟁이 점점 치열해집니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["job", "prices", "culture", "environment"], ["job", "prices"], metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "준비비", amount: 1 }], "수도권에서 경쟁을 이어갔지만 준비 비용이 들었습니다."), localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }], "지방의 새 기회를 찾아 이동했습니다.", "이번 라운드는 지역 일자리로 모두 취업합니다."), "일자리가 많은 곳일수록 경쟁 비용도 커질 수 있습니다."),
    local: scenario("지역 산업 성장", "산업", "지방에 스마트 농업과 친환경 에너지 회사가 생겼습니다. 새 회사들은 지역에서 일할 사람을 찾고 있습니다. 깨끗한 환경과 넓은 공간도 지역의 장점이 됩니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["job", "environment", "culture", "family"], ["job", "environment"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "수도권 일자리를 찾아 이동했습니다."), localOption("지방 유지", 3, 1, [{ label: "월세", amount: 1 }], "지역 산업에서 새 일자리를 얻었습니다.", "이번 라운드는 지역 산업 성장으로 모두 취업합니다."), "지역 산업이 생기면 지방도 새로운 선택지가 됩니다."),
    crisis: scenario("새 기술 적응", "위기", "새로운 산업에서는 새로운 기술을 배워야 합니다. 교육 지원이 부족하면 좋은 일자리를 잡기 어렵습니다. 배우고 적응하는 사람에게 기회가 더 많이 돌아갑니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["job", "policy", "culture", "traffic"], ["job", "policy"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 4 }, { label: "교육비", amount: 1 }], "새 기술을 배우느라 비용이 들었습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교육비", amount: 1 }], "지원이 부족해 적응이 쉽지 않았습니다.", "기술 적응이 어려워 일자리를 구하지 못했습니다."), "산업 변화에는 교육과 지원이 함께 필요합니다."),
    opportunity: scenario("지역 창업", "기회", "지역 특산품과 관광을 활용한 작은 가게가 인기를 얻고 있습니다. 지역 문화를 잘 살리면 새로운 일을 만들 수 있습니다. 큰 회사가 아니어도 돈을 벌 방법이 생깁니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["job", "culture", "environment", "medical"], ["job", "culture"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }], "도시 시장에서 새로운 일을 시도했습니다."), localOption("지방 선택", 3, 1, [{ label: "월세", amount: 1 }], "지역 문화를 활용해 새 기회를 얻었습니다.", "이번 라운드는 창업 기회로 모두 취업합니다."), "지역의 고유한 문화도 일자리로 이어질 수 있습니다."),
  },
  {
    metro: scenario("과밀 비용", "과밀", "수도권에 사람이 많아지며 쓰레기와 미세먼지 문제가 커졌습니다. 음식값과 서비스 비용도 전보다 올랐습니다. 편리한 도시 생활 뒤에 숨은 비용이 늘어납니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["environment", "prices", "job", "family"], ["environment", "prices"], metroOption("수도권 유지", 3, [{ label: "월세", amount: 4 }, { label: "환경비", amount: 1 }, { label: "물가", amount: 1 }], "수도권에 남았지만 과밀 비용이 크게 들었습니다."), localOption("지방 이동", 3, 1, [{ label: "월세", amount: 1 }, { label: "이동비", amount: 1 }], "지방으로 이동해 과밀 비용을 줄였습니다.", "이번 라운드는 분산 효과로 모두 취업합니다."), "과밀은 편리함 뒤에 숨은 비용을 만듭니다."),
    local: scenario("줄어드는 시설", "과밀", "지방에서는 사람이 줄어 작은 병원과 가게가 문을 닫기도 합니다. 학교 행사나 문화 프로그램도 전보다 줄었습니다. 생활비는 낮지만 이용할 수 있는 시설이 적어집니다.", "이번 상황과 관련 깊은 조건 2개를 고르세요.", ["medical", "culture", "rent", "environment"], ["medical", "culture"], metroOption("수도권 이동", 3, [{ label: "월세", amount: 4 }], "수도권으로 이동해 시설 접근성이 좋아졌습니다."), localOption("지방 유지", 2, 0.5, [{ label: "월세", amount: 1 }], "지방에 남아 생활비는 아꼈습니다.", "시설이 줄고 일자리도 얻지 못했습니다."), "인구 감소는 생활 시설 축소로 이어질 수 있습니다."),
    crisis: scenario("생활 기반 축소", "위기", "가까운 병원이 문을 닫아 다른 지역으로 가야 합니다. 이동 시간이 늘고 교통비도 더 듭니다. 필요한 시설이 사라지면 생활이 갑자기 불편해집니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["medical", "traffic", "culture", "family"], ["medical", "traffic"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 4 }], "수도권의 시설을 이용했지만 비용이 컸습니다."), localOption("지방 선택", 2, 0.5, [{ label: "월세", amount: 1 }, { label: "교통비", amount: 2 }], "지방에 남았지만 먼 이동이 필요했습니다.", "시설 축소로 비용이 들고 일자리도 놓쳤습니다."), "생활 기반이 줄면 낮은 월세만으로는 충분하지 않습니다."),
    opportunity: scenario("마을 공동체", "기회", "주민들이 함께 작은 축제와 돌봄 모임을 만들었습니다. 가족과 이웃이 서로 도우며 빈자리를 채워 갑니다. 사람은 적지만 함께하는 활동이 늘어납니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["culture", "family", "policy", "prices"], ["culture", "family"], metroOption("수도권 선택", 3, [{ label: "월세", amount: 3 }], "도시의 다양한 활동을 이용했습니다."), localOption("지방 선택", 3, 1, [{ label: "월세", amount: 1 }], "마을 공동체의 도움으로 안정적으로 지냈습니다.", "이번 라운드는 공동체 도움으로 모두 취업합니다."), "지역 공동체는 부족한 시설을 일부 보완할 수 있습니다."),
  },
  {
    metro: scenario("수도권에 남을까", "최종", "수도권에는 일자리와 큰 병원이 많습니다. 하지만 월세와 생활비가 높아 코인이 많이 필요합니다. 계속 살려면 높은 비용을 감당해야 합니다.", "이번 최종 상황과 관련 깊은 조건 2개를 고르세요.", ["job", "rent", "medical", "environment"], ["job", "rent"], metroOption("수도권 최종 선택", 3, [{ label: "월세", amount: 4 }, { label: "생활비", amount: 1 }], "수도권에 남아 기회를 잡았지만 비용이 컸습니다."), localOption("지방 최종 선택", 3, 1, [{ label: "월세", amount: 1 }, { label: "이동비", amount: 1 }], "지방으로 이동해 비용을 줄였습니다.", "이번 라운드는 최종 선택으로 모두 취업합니다."), "수도권의 장점은 비용 부담과 함께 생각해야 합니다."),
    local: scenario("지방에 남을까", "최종", "지방은 월세가 낮고 생활이 여유로울 수 있습니다. 하지만 안정적인 일자리와 가까운 병원이 충분한지 살펴야 합니다. 오래 살려면 생활에 꼭 필요한 시설이 필요합니다.", "이번 최종 상황과 관련 깊은 조건 2개를 고르세요.", ["job", "medical", "rent", "culture"], ["job", "medical"], metroOption("수도권 최종 선택", 3, [{ label: "월세", amount: 4 }], "수도권으로 이동해 일자리와 시설을 선택했습니다."), localOption("지방 최종 선택", 3, 1, [{ label: "월세", amount: 1 }, { label: "인프라비", amount: 1 }], "지방에 남아 생활비를 줄이고 안정적으로 지냈습니다.", "이번 라운드는 최종 선택으로 모두 취업합니다."), "지방의 지속 가능성은 일자리와 필수 시설에 달려 있습니다."),
    crisis: scenario("마지막 생존 점검", "위기", "남은 코인이 많지 않아 지출을 줄여야 합니다. 월세를 감당하면서도 안정적인 수입을 얻어야 합니다. 이번 선택은 마지막 결과에 큰 영향을 줍니다.", "이번 위기와 관련 깊은 조건 2개를 고르세요.", ["rent", "job", "culture", "environment"], ["rent", "job"], metroOption("수도권 최종 선택", 3, [{ label: "월세", amount: 4 }], "수도권 일자리를 택했지만 월세 부담이 컸습니다."), localOption("지방 최종 선택", 3, 1, [{ label: "월세", amount: 1 }], "낮은 월세와 안정적인 수입으로 버텼습니다.", "이번 라운드는 최종 선택으로 모두 취업합니다."), "코인이 부족할수록 수입과 고정 지출이 중요해집니다."),
    opportunity: scenario("살고 싶은 지역 만들기", "기회", "지역을 더 살기 좋게 만드는 여러 아이디어가 모였습니다. 좋은 정책이 실제 일자리로 이어지면 사람들이 머물 수 있습니다. 내가 선택한 지역도 바뀔 수 있습니다.", "이번 기회와 관련 깊은 조건 2개를 고르세요.", ["policy", "job", "culture", "prices"], ["policy", "job"], metroOption("수도권 최종 선택", 3, [{ label: "월세", amount: 3 }], "정책 변화를 보며 수도권 생활을 마무리했습니다."), localOption("지방 최종 선택", 3, 1, [{ label: "월세", amount: 1 }], "정책과 일자리 변화로 지방의 가능성을 확인했습니다.", "이번 라운드는 최종 선택으로 모두 취업합니다."), "좋은 정책과 일자리는 지역의 미래를 바꿀 수 있습니다."),
  },
];

const questions = [
  "내가 처음 중요하다고 생각한 조건은 무엇이었나요?",
  "게임 중에 생각이 바뀐 조건이 있었나요?",
  "수도권에 사람이 몰리면 어떤 문제가 생기나요?",
  "지방에 사람들이 살고 싶게 만들려면 어떤 조건이 필요할까요?",
];

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

function chooseScenarioKey() {
  if (state.roundIndex === 0) return "common";
  if (state.coins <= 2 || state.lastRoll === 1) return "crisis";
  if (state.lastRoll === 6 || state.consecutiveBonus >= 2) return "opportunity";
  return state.currentRegion || "local";
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

function getChoiceLabel(type, option) {
  if (!state.currentRegion) return option.label;
  return state.currentRegion === type ? `${getRegionLabel(type)}에 계속 살기` : `${getRegionLabel(type)}으로 이동하기`;
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
  const locationText = state.currentRegion
    ? `현재 거주지: ${getRegionLabel(state.currentRegion)}. 이번 라운드에서는 계속 살지, 다른 지역으로 이동할지 결정합니다.`
    : "아직 거주지를 정하지 않았습니다. 첫 거주지를 선택합니다.";

  renderShell(`
    <section class="round-layout">
      <article class="story-panel">
        <p class="round-kicker">ROUND ${state.roundIndex + 1}</p>
        <h2>${round.title}</h2>
        <p class="location-note">${locationText}</p>
        <p>${round.scene}</p>
        <div class="question-strip">${round.question}</div>
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
                  ${factorLabels[factor]}
                </button>
              `,
            )
            .join("")}
        </div>
        <p class="puzzle-help">${ready ? "선택 완료! 이제 아래에서 지역을 고르세요." : "이번 상황을 바꾸는 조건 2개를 터치하세요."}</p>
      </section>
      <section class="choice-grid ${ready ? "" : "locked"}">
        ${renderChoiceButton("metro", round.metro, "city")}
        ${renderChoiceButton("local", round.local, "town")}
      </section>
    </section>
  `);
}

function renderChoiceButton(type, option, icon) {
  const incomeText = type === "metro" ? `월급 ${option.income}코인` : `취업 시 월급 ${option.income}코인`;
  const chanceText =
    type === "local" ? `<span>취업 확률 ${Math.round(option.employmentRate * 100)}%</span>` : "<span>취업 확정</span>";

  return `
    <button class="choice-card ${type}" type="button" data-choice="${type}">
      <span class="choice-icon ${icon}"></span>
      <strong>${getChoiceLabel(type, option)}</strong>
      <span>${incomeText}</span>
      <span>지출: ${formatCosts(option.costs)}</span>
      ${chanceText}
    </button>
  `;
}

function renderDice() {
  const round = getCurrentScenario();
  const option = round[state.pendingChoice];
  const successMin = state.pendingChoice === "local" ? getLocalSuccessMin(option.employmentRate) : null;
  const employmentText =
    state.pendingChoice === "local"
      ? `지방 취업은 주사위 ${successMin} 이상이면 성공합니다.`
      : "수도권은 이번 라운드 취업이 확정입니다.";

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
