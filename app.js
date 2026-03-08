// Manifest App Logic

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                if (t.id === tabId) t.classList.add('active');
            });
        });
    });

    // Physique Generator Logic
    const generateBtn = document.getElementById('generate-btn');
    const genLoading = document.getElementById('gen-loading');
    const genResult = document.getElementById('generator-result');
    const genImg = document.getElementById('generated-image');

    generateBtn.addEventListener('click', () => {
        genLoading.classList.remove('hidden');
        genResult.classList.remove('hidden');
        
        // Vertex AI Imagen 연동 시뮬레이션 (3초)
        setTimeout(() => {
            // 이전에 생성해둔 이미지나 더미 이미지 사용
            genImg.src = `https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600`;
            genLoading.classList.add('hidden');
            
            // Ghost Overlay에 자동 반영
            document.getElementById('img-target').src = genImg.src;
        }, 3000);
    });

    // Vision Analysis Logic
    const currentInput = document.getElementById('current-input');
    const progressPath = document.getElementById('progress-path');
    const progressText = document.getElementById('progress-text');
    const canvas = document.getElementById('current-canvas');
    const ctx = canvas.getContext('2d');

    // 리사이즈 대응
    canvas.width = 400;
    canvas.height = 500;

    document.getElementById('current-upload').addEventListener('click', () => {
        currentInput.click();
    });

    currentInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Ghost Overlay에 반영
                document.getElementById('img-current').src = event.target.result;
                
                // 분석 시뮬레이션
                runAnalysis();
            };
            reader.readAsDataURL(file);
        }
    });

    function runAnalysis() {
        const targetPoints = window.VisionAnalyzer.generateMockPoints(0);
        const currentPoints = window.VisionAnalyzer.generateMockPoints(0.1); // 약간의 오차

        window.VisionAnalyzer.drawPoints(ctx, currentPoints, '#00f2fe');
        
        const progress = window.VisionAnalyzer.calculateProgress(targetPoints, currentPoints);
        
        // 애니메이션 효과와 함께 진척도 업데이트
        let currentDisplay = 0;
        const interval = setInterval(() => {
            if (currentDisplay >= progress) {
                clearInterval(interval);
            } else {
                currentDisplay += 1;
                updateProgressUI(currentDisplay);
            }
        }, 20);
    }

    function updateProgressUI(pct) {
        progressText.textContent = `${pct}%`;
        progressPath.style.strokeDasharray = `${pct}, 100`;
    }

    // Ghost Overlay Logic
    const opacitySlider = document.getElementById('opacity-slider');
    const imgCurrent = document.getElementById('img-current');

    opacitySlider.addEventListener('input', (e) => {
        const val = e.target.value;
        imgCurrent.style.opacity = val;
    });
});
