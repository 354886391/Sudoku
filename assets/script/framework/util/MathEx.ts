import { Vec2, Vec3, v2 } from "cc";

export class MathEx {

    /**
    * value 以 amount 为增量累加接近但不超过 target
    */
    public static approach(value: number, target: number, amount: number): number {
        return value > target ? Math.max(value - amount, target) : Math.min(value + amount, target);
    }

    /**
     * 范围 a <= value <= b
     */
    public static clamp(value: number, a: number, b: number): number {
        return Math.max(a, Math.min(value, b));
    }

    public static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * this.clamp(t, 0, 1);
    }

    /**
     * 返回 value 的符号(-1, 0, 1)
     * @param value 
     * @returns 
     */
    public static sign(value: number): number {
        return value > 0 ? 1 : value < 0 ? -1 : 0;
    }

    public static abs(value: number): number {
        return value > 0 ? value : -value;
    }

    /**
     * 50%概率返回true
     */
    public static maybe(): boolean {
        return Math.random() < 0.5;
    }

    /**
     * 范围[min, max]的整数
     */
    public static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 范围[min, max] && 不包括ex
     */
    public static randomEx(exclude: number, min: number, max: number): number {
        let ans = this.random(min, max);
        if (ans === exclude) ans = this.randomEx(exclude, min, max);
        return ans;
    }

    public static addV2(a: Vec2, b: Vec2) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    public static subV2(a: Vec2, b: Vec2) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    public static addV3(a: Vec3, b: Vec3) {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static subV3(a: Vec3, b: Vec3) {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }


    /** p0 起点(0, 0), p3 终点(1, 1), p1 p2 控制点 */
    cubicBezier(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2) {
        const ZERO_LIMIT = 1e-6;
        // Calculate the polynomial coefficients,
        // implicit first and last control points are (0,0) and (1,1).
        const ax = 3 * p1.x - 3 * p2.x + 1;
        const bx = 3 * p2.x - 6 * p1.x;
        const cx = 3 * p1.x;

        const ay = 3 * p1.y - 3 * p2.y + 1;
        const by = 3 * p2.y - 6 * p1.y;
        const cy = 3 * p1.y;

        function sampleCurveDerivativeX(t: number) {
            // `ax t^3 + bx t^2 + cx t` expanded using Horner's rule
            return (3 * ax * t + 2 * bx) * t + cx;
        }

        function sampleCurveX(t: number) {
            return ((ax * t + bx) * t + cx) * t;
        }

        function sampleCurveY(t: number) {
            return ((ay * t + by) * t + cy) * t;
        }

        // Given an x value, find a parametric value it came from.
        function solveCurveX(x: number) {
            let t2 = x;
            let derivative: number;
            let x2: number;
            // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
            // first try a few iterations of Newton's method -- normally very fast.
            // http://en.wikipedia.org/wikiNewton's_method
            for (let i = 0; i < 8; i++) {
                // f(t) - x = 0
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < ZERO_LIMIT) {
                    return t2;
                }
                derivative = sampleCurveDerivativeX(t2);
                // == 0, failure
                /* istanbul ignore if */
                if (Math.abs(derivative) < ZERO_LIMIT) {
                    break;
                }
                t2 -= x2 / derivative;
            }
            // fall back to the bisection method for reliability.
            // bisection
            // http://en.wikipedia.org/wiki/Bisection_method
            let t1 = 1;
            /* istanbul ignore next */
            let t0 = 0;
            /* istanbul ignore next */
            t2 = x;
            /* istanbul ignore next */
            while (t1 > t0) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < ZERO_LIMIT) {
                    return t2;
                }
                if (x2 > 0) {
                    t1 = t2;
                } else {
                    t0 = t2;
                }
                t2 = (t1 + t0) / 2;
            }
            // failure
            return t2;
        }
        function solve(x: any) {
            return sampleCurveY(solveCurveX(x));
        }
        return solve;
    }

    /** 德卡斯特里奥算法 
     * points index: 0 起始点, length-1 终点. 中间为控制点
     * position： 为进度百分比[0, 1]
     * return： in和out（分别对应中点的“入”和“出”切线
    */
    deCasteljau(points: Vec2[], position = 0.5) {
        let a: Vec2, b: Vec2, midpoints = [];
        while (points.length > 1) {
            const num = points.length - 1;
            for (let i = 0; i < num; ++i) {
                a = points[i];
                b = points[i + 1];
                midpoints.push(v2(
                    a.x + ((b.x - a.x) * position),
                    a.y + ((b.y - a.y) * position),
                ));
            }
            points = midpoints;
            midpoints = [];
        }
        return Object.assign(points[0], { in: a, out: b });
    }
}