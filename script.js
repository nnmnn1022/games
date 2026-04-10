/**
 * 파티 입장 버튼 클릭 시 이벤트
 */
function enterParty() {
    alert('🎉 파티에 입장하셨습니다! 다음 게임 준비 중...');
}

// 화면 진입 시 페이드 인 효과
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 10);
});
