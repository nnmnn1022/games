/**
 * SPA 라우팅 시스템
 */

const app = document.getElementById('app');

/**
 * 특정 화면으로 이동하는 함수
 * @param {string} viewId - 불러올 뷰의 ID (파일명과 일치)
 * @param {boolean} pushState - 히스토리에 기록할지 여부
 */
async function navigateTo(viewId, pushState = true) {
    try {
        const response = await fetch(`views/${viewId}.html`);
        if (!response.ok) throw new Error('페이지를 찾을 수 없습니다.');
        
        const content = await response.text();
        
        // 페이드 아웃 효과 (선택 사항)
        app.style.opacity = '0';
        
        setTimeout(() => {
            app.innerHTML = content;
            app.style.opacity = '1';
            
            // 히스토리에 추가
            if (pushState) {
                window.history.pushState({ viewId }, '', `#${viewId}`);
            }
        }, 300);
        
    } catch (error) {
        console.error('라우팅 오류:', error);
        app.innerHTML = `<h2 class="neon-text-small">오류가 발생했습니다.</h2><p>${error.message}</p>`;
    }
}

/**
 * 브라우저 뒤로 가기/앞으로 가기 대응
 */
window.onpopstate = (event) => {
    if (event.state && event.state.viewId) {
        navigateTo(event.state.viewId, false);
    } else {
        navigateTo('main', false);
    }
};

/**
 * 파티 입장 버튼 클릭 시 이벤트
 */
function enterParty() {
    alert('🎉 파티에 입장하셨습니다! 다음 게임 준비 중...');
}

// 초기 로드 시 처리
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    const initialView = hash || 'main';
    navigateTo(initialView, false);
});
