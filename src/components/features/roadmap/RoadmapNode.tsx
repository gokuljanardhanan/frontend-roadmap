import { Handle, NodeProps, Position } from "reactflow";
import ProgressBar from "./ProgressBar";
import { CSSProperties } from "react";

interface RoadmapNodeData {
  label: string;
  description?: string;
  recommended?: boolean;
  alternative?: boolean;
  isMainNode?: boolean;
  progress?: number; // Add progress prop
}

export default function RoadmapNode({ data }: NodeProps<RoadmapNodeData>) {
  const nodeStyle: CSSProperties = {
    backgroundColor: "rgb(67, 56, 202)", // Indigo for child nodes
    border: "1px solid",
    borderColor: "rgb(99, 102, 241)", // Lighter indigo border
    padding: "10px",
    borderRadius: "8px",
    width: "250px",
    minHeight: "80px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    position: "relative" as const,
    color: "white", // White text for better contrast
  };

  return (
    <div style={nodeStyle} className="dark:opacity-90">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#666", top: 0 }}
        id="top"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#666", bottom: 0 }}
        id="bottom"
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "#666", left: 0 }}
        id="left"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#666", right: 0 }}
        id="right"
      />

      <div className="text-center">{data.label}</div>
      {data.description && (
        <div className="text-sm mt-1 text-gray-600">{data.description}</div>
      )}

      {/* Add progress bar */}
      <ProgressBar
        progress={data.progress || 40}
        color="#4ADE80" // Green progress bar as shown in image
      />
    </div>
  );
}
