
const mappings = {
    '♠️': ['chị gấu: ăn mì', 'anh cương: dán diều', 'anh thiện: nghe loa', 'mi: bấm laptop', 'cuội: ôm gối', 'kính: đội mũ', 'ân: ngủ ghế', 'tuyền: bó tay', 'mắm: chia kẹo', 'tường: thục bida', 'cô tâm: để tiền trong túi', 'cô hoa: đeo cặp', 'cô loan: múa quạt'],
    '♣️': ['anh duy: bê cháo', 'chị quỳnh: quay tiktok', 'anh lương: giắc dao', 'trâm: luộc trứng', 'phú: nấu canh', 'trang: đếm tiền', 'thư: chụp hình', 'tiên: sơn móng', 'cún: xếp bài', 'huy: câu cá', 'cô xuân lan: sấy tóc', 'cô chi: ngồi xổm', 'cô sen: để bút trong áo'],
    '♦️': ['bác phương: gói bánh', 'bác tươi: gọt xoài', 'bác liên: cắt giấy', 'mẹ: nhảy dây', 'cô là: nướng thịt', 'thím hạnh: lau ly', 'cô liễu: hát mic', 'cô luyện: cân rau', 'cô lự: nhặt cà phê', 'thím hoa: quét rác', 'cô điệp: kẻ mi', 'cô hương: đánh phấn', 'cô nhàn: son môi'],
    '♥️': ['bác lâm: sửa đồng hồ', 'bác lộc: uống rượi', 'bác liệu: hút thuốc', 'ba: đập điện thoại', 'chú thịnh: đánh răng', 'chú lực: rửa xe', 'chú minh: đọc báo', 'chú tuấn: chặt sương', 'chú tam: vứt chìa khóa', 'chú tuấn: hàn bàn', 'cô yến: phơi khăn', 'cô nam: cột phấn', 'cô hà: viết sách']
};

const suits = ['♠️', '♣️', '♦️', '♥️'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let currentIndex = 0;
let timeStamps = [];
let currentPair = [];

function generateDeck() {
    deck = [];
    for (let suit of suits) {
        for (let i = 0; i < values.length; i++) {
            deck.push({ card: values[i] + suit, valueIndex: i, suit });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startPractice() {
    generateDeck();
    shuffleDeck();
    currentIndex = 0;
    timeStamps = [];
    document.getElementById("result").innerHTML = "";
    nextPair();
}

function nextPair() {
    if (currentIndex + 1 >= deck.length) {
        finishPractice();
        return;
    }
    currentPair = [deck[currentIndex], deck[currentIndex + 1]];
    document.getElementById("cardDisplay").innerText = currentPair.map(c => c.card).join(" - ");
    document.getElementById("userInput").value = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("userInput").focus();
    timeStamps.push({ start: performance.now(), card: currentPair.map(c => c.card).join(" - ") });
}

function checkAnswer() {
    let person = mappings[currentPair[0].suit][currentPair[0].valueIndex].split(":")[0].trim();
    let action = mappings[currentPair[1].suit][currentPair[1].valueIndex].split(":")[1].trim();
    let expected = (person + " " + action).toLowerCase();
    let userInput = document.getElementById("userInput").value.trim().toLowerCase();
    if (userInput === expected) {
        timeStamps[timeStamps.length - 1].end = performance.now();
        currentIndex += 2;
        nextPair();
    } else {
        document.getElementById("feedback").innerText = "Sai rồi! Thử lại nha.";
    }
}

function finishPractice() {
    let resultHTML = "<h3>Kết quả luyện tập:</h3><ul>";
    let totalTime = 0;
    timeStamps.forEach((t, i) => {
        let time = ((t.end - t.start) / 1000).toFixed(2);
        totalTime += parseFloat(time);
        resultHTML += `<li>${t.card}: ${time} giây</li>`;
    });
    resultHTML += `</ul><strong>Tổng thời gian: ${totalTime.toFixed(2)} giây</strong>`;
    document.getElementById("result").innerHTML = resultHTML;
}

// Thêm sự kiện nhấn Enter để kiểm tra
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
});
