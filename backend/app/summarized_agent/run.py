import json

from .agent import build_agent


def main():

    print("=" * 60)
    print("       YouTube Comment Summarization Agent")
    print("=" * 60)

    url = input(
        "\nEnter YouTube URL: "
    ).strip()

    if not url:
        print("URL cannot be empty.")
        return

    agent = build_agent()

    initial_state = {
        "video_url": url
    }

    print("\n[1] Starting agent...")

    try:

        result = agent.invoke(
            initial_state
        )

        print("\n" + "=" * 60)
        print("FINAL REPORT")
        print("=" * 60)

        print(
            f"\nVideo: "
            f"{result.get('video_title', 'Unknown')}"
        )

        print(
            f"Comments analyzed: "
            f"{len(result.get('comments', []))}"
        )

        print("\nAnalysis:")

        print(
            json.dumps(
                result["final_summary"],
                ensure_ascii=False,
                indent=2
            )
        )

    except Exception as e:

        print("\nAgent failed:")
        print(str(e))


if __name__ == "__main__":
    main()