// Progress Algorithm & Vision Support

const VisionAnalyzer = {
    // 유클리드 거리 기반 진척도 계산 수식 구현
    // Progress (%) = (1 - Σ|Target_coord - Current_coord| / Total_points) * 100
    calculateProgress: function(targetPoints, currentPoints) {
        if (!targetPoints || !currentPoints || targetPoints.length !== currentPoints.length) {
            return 0;
        }

        let totalDistance = 0;
        const totalPoints = targetPoints.length;

        for (let i = 0; i < totalPoints; i++) {
            const p1 = targetPoints[i];
            const p2 = currentPoints[i];
            
            // X, Y 좌표의 유클리드 거리를 합산
            const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            totalDistance += dist;
        }

        // 정규화된 진척도 계산 (거리가 작을수록 1에 가까워짐)
        // 최대 거리 임계값을 설정하여 % 산출
        const maxThreshold = 0.5 * totalPoints; // 조정 가능한 임계값
        let progress = (1 - (totalDistance / maxThreshold)) * 100;
        
        return Math.max(0, Math.min(100, progress)).toFixed(1);
    },

    // 더미 데이터 생성 (시연용)
    generateMockPoints: function(variance = 0) {
        // 인체 주요 지점 (어깨, 골반, 무릎 등) 단순화된 좌표
        const basePoints = [
            { id: 'left_shoulder', x: 0.4, y: 0.2 },
            { id: 'right_shoulder', x: 0.6, y: 0.2 },
            { id: 'left_hip', x: 0.42, y: 0.5 },
            { id: 'right_hip', x: 0.58, y: 0.5 },
            { id: 'left_knee', x: 0.43, y: 0.75 },
            { id: 'right_knee', x: 0.57, y: 0.75 }
        ];

        return basePoints.map(p => ({
            ...p,
            x: p.x + (Math.random() - 0.5) * variance,
            y: p.y + (Math.random() - 0.5) * variance
        }));
    },

    // 캔버스에 키포인트 그리기
    drawPoints: function(ctx, points, color) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = color;
        
        points.forEach(p => {
            const x = p.x * ctx.canvas.width;
            const y = p.y * ctx.canvas.height;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // 글로우 효과
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
        });

        // 뼈대 연결
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5]
        ];

        connections.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(points[i].x * ctx.canvas.width, points[i].y * ctx.canvas.height);
            ctx.lineTo(points[j].x * ctx.canvas.width, points[j].y * ctx.canvas.height);
            ctx.stroke();
        });
        
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
    }
};

window.VisionAnalyzer = VisionAnalyzer;
