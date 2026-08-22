from __future__ import annotations

from html import escape
def _safe_ratio(likes: int, views: int) -> float:
    if views <= 0:
        return 0.0
    return likes / views


def build_like_view_chart(
    videos: list[dict],
    title: str | None = None,
) -> dict:
    """
    Build an SVG bar chart for like/view ratio.

    The agent must compute ratios before calling this tool.
    """

    top_videos = list(videos)

    if not top_videos:
        return {
            "type": "svg",
            "svg": "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 760 280' preserveAspectRatio='xMidYMid meet'><rect width='100%' height='100%' rx='16' fill='#0f172a'/><text x='28' y='56' font-size='18' fill='#f8fafc' font-family='Inter, Arial, sans-serif'>No data to chart.</text></svg>",
            "title": title or "Like/View Ratio",
        }

    ratios = [
        _safe_ratio(
            int(video.get("likes", 0)),
            int(video.get("views", 0)),
        )
        for video in top_videos
    ]

    max_ratio = max(ratios) if ratios else 0.0
    chart_width = 760
    chart_height = 280
    left_pad = 54
    right_pad = 24
    top_pad = 52
    bottom_pad = 62
    plot_width = chart_width - left_pad - right_pad
    plot_height = chart_height - top_pad - bottom_pad
    bar_gap = 10
    bar_width = max(16, (plot_width - bar_gap * (len(top_videos) - 1)) / len(top_videos))

    def y_for(value: float) -> float:
        if max_ratio <= 0:
            return top_pad + plot_height
        return top_pad + plot_height - (value / max_ratio) * plot_height

    lines = [
        f"<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 {chart_width} {chart_height}' preserveAspectRatio='xMidYMid meet'>",
        "<rect width='100%' height='100%' rx='18' fill='#0f172a'/>",
        f"<text x='{left_pad}' y='28' font-size='16' font-family='Inter, Arial, sans-serif' font-weight='700' fill='#f8fafc'>{escape(title or 'Top videos like/view ratio')}</text>",
        f"<text x='{left_pad}' y='44' font-size='10' font-family='Inter, Arial, sans-serif' fill='#cbd5e1'>Ratio = likes / views</text>",
    ]

    grid_steps = 4
    for step in range(grid_steps + 1):
        ratio_value = max_ratio * step / grid_steps if max_ratio > 0 else 0
        y = y_for(ratio_value)
        lines.append(
            f"<line x1='{left_pad}' y1='{y:.2f}' x2='{chart_width - right_pad}' y2='{y:.2f}' stroke='#1e293b' stroke-width='1'/>"
        )
        lines.append(
            f"<text x='10' y='{y + 3:.2f}' font-size='9' font-family='Inter, Arial, sans-serif' fill='#94a3b8'>{ratio_value:.2%}</text>"
        )

    for index, video in enumerate(top_videos):
        likes = int(video.get("likes", 0))
        views = int(video.get("views", 0))
        ratio = _safe_ratio(likes, views)
        bar_height = 0 if max_ratio <= 0 else (ratio / max_ratio) * plot_height
        x = left_pad + index * (bar_width + bar_gap)
        y = top_pad + plot_height - bar_height
        bar_color = "#22c55e" if index == 0 else "#38bdf8"

        lines.append(
            f"<rect x='{x:.2f}' y='{y:.2f}' width='{bar_width:.2f}' height='{bar_height:.2f}' rx='10' fill='{bar_color}'/>"
        )
        lines.append(
            f"<text x='{x + bar_width / 2:.2f}' y='{y - 8:.2f}' text-anchor='middle' font-size='9' font-family='Inter, Arial, sans-serif' fill='#e2e8f0'>{ratio:.2%}</text>"
        )

        rank_label = f"#{int(video.get('rank', index + 1))}"
        title_label = escape(str(video.get("title", ""))[:18])
        lines.append(
            f"<text x='{x + bar_width / 2:.2f}' y='{chart_height - 38}' text-anchor='middle' font-size='9' font-family='Inter, Arial, sans-serif' fill='#cbd5e1'>{rank_label}</text>"
        )
        lines.append(
            f"<text x='{x + bar_width / 2:.2f}' y='{chart_height - 24}' text-anchor='middle' font-size='8' font-family='Inter, Arial, sans-serif' fill='#94a3b8'>{title_label}</text>"
        )

    lines.append(
        f"<text x='{left_pad}' y='{chart_height - 8}' font-size='9' font-family='Inter, Arial, sans-serif' fill='#94a3b8'>Computed from {len(top_videos)} videos.</text>"
    )
    lines.append("</svg>")

    return {
        "type": "svg",
        "svg": "".join(lines),
        "title": title or "Like/View Ratio",
        "count": len(top_videos),
        "max_ratio": round(max_ratio, 6),
    }
