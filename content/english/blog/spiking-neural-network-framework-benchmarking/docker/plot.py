import pandas as pd
import os
import argparse

df = pd.read_csv("data.csv")

os.makedirs("./fig", exist_ok=True)

##############

df["total"] = df["forward"] + df["backward"]
df["memory"] = df["memory"] * 1e-6
df["framework"] = df["framework"].str.replace("<br>", " ")
df["framework"] = df["framework"].str.replace(
    "SpikingJelly CuPy v0.0.0.0.15", "SpikingJelly v0.0.15"
)
df["framework"] = df["framework"].str.replace("Rockpool EXODUS", "Rockpool EXODUS<br>")
df["framework"] = df["framework"].str.replace("Sinabs EXODUS", "Sinabs EXODUS<br>")

###############

import plotly.express as px
import plotly.graph_objects as go

frameworks = df["framework"].unique()


def get_runtime_figure(df, rounding=2, title=""):
    fig = px.bar(
        df,
        y="framework",
        x=["forward", "backward"],
        log_x=True,
        text_auto=f".{rounding}f",
        orientation="h",
    ).add_trace(
        go.Scatter(
            y=frameworks,
            x=df["total"].to_numpy() * 1.05,
            mode="text",
            text=df["total"].round(rounding),
            textposition="middle right",
            showlegend=False,
        )
    )
    fig.data[0]["textposition"] = "inside"
    fig.data[1]["textposition"] = "inside"

    fig.update_layout(
        title=title,
        yaxis={"categoryorder": "total descending"},
        legend=dict(orientation="h", yanchor="bottom", y=1.01, xanchor="right", x=1),
        margin=dict(l=0, r=20, t=70, b=10),
        yaxis_title="",
        xaxis_title="Time (s)",
    )
    # increase size of facet titles
    fig.update_annotations(font_size=14)
    return fig


def get_memory_figure(df, rounding=0, title=""):
    df = df[df["framework"].str.contains("Spyx") == False]
    fig = px.bar(
        df,
        y="framework",
        x=["memory"],
        # log_x=True,
        text_auto=f".{rounding}f",
        orientation="h",
        # range_x=(0, df["memory"].max() * 1.1),
    )
    fig.data[0]["textposition"] = "inside"

    fig.update_layout(
        title=title,
        yaxis={"categoryorder": "total descending"},
        margin=dict(l=0, r=20, t=70, b=10),
        yaxis_title="",
        xaxis_title="Max memory usage (MB)",
        showlegend=False
    )
    # increase size of facet titles
    fig.update_annotations(font_size=14)
    return fig


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch_size", action="store", default=None, required=False)
    args = parser.parse_args()
    batch_str = (
        f", batch size of {args.batch_size}" if args.batch_size is not None else ""
    )
    ####################

    df8k = df[df["neurons"] == 8192]

    fig = get_runtime_figure(
        df8k, title=f"Latency for 8k neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-8k.json")
    fig.write_image("./fig/framework-benchmarking-8k.png", width=1024)
    fig.write_image("./fig/framework-benchmarking-8k-header.png", width=1600)
    fig.show()

    fig = get_memory_figure(df8k, title="Memory use for 8k neurons, lower is better")

    fig.write_json("./fig/framework-benchmarking-mem-8k.json")
    fig.write_image("./fig/framework-benchmarking-mem-8k.png", width=1024)
    fig.write_image("./fig/framework-benchmarking-mem-8k-header.png", width=1600)
    fig.show()

    ###################

    df4k = df[df["neurons"] == 4096]

    fig = get_runtime_figure(
        df4k, title=f"Latency for 4k neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-4k.json")
    fig.write_image("./fig/framework-benchmarking-4k.png", width=1024)  # scale=2)
    fig.write_image(
        "./fig/framework-benchmarking-4k-header.png", width=1024, height=570
    )
    fig.show()

    fig = get_memory_figure(df4k, title="Memory use for 4k neurons, lower is better")

    fig.write_json("./fig/framework-benchmarking-mem-4k.json")
    fig.write_image("./fig/framework-benchmarking-mem-4k.png", width=1024)
    fig.write_image("./fig/framework-benchmarking-mem-4k-header.png", width=1600)
    fig.show()

    ###################

    df512 = df[df["neurons"] == 512]

    fig = get_runtime_figure(
        df512, title=f"Latency for 512 neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-512.json")
    fig.write_image("./fig/framework-benchmarking-512.png", width=1024)  # scale=2)
    fig.write_image(
        "./fig/framework-benchmarking-512-header.png", width=1024, height=570
    )
    fig.show()

    fig = get_memory_figure(
        df512, title=f"Memory use for 512 neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-mem-512.json")
    fig.write_image("./fig/framework-benchmarking-mem-512.png", width=1024)
    fig.write_image("./fig/framework-benchmarking-mem-512-header.png", width=1600)
    fig.show()
