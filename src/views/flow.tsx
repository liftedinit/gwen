import { useParams, Link } from "react-router-dom";
import { Box, Text, Heading } from "@liftedinit/ui";
import { NodeEditor, FlumeConfig, Colors, Controls } from "flume";
import "features/flows/flume.css";

interface INodePresets {
  flow: string;
  name: string;
  nodes: any;
}

const NODES: INodePresets[] = [
  {
    flow: "web-server",
    name: "Web Server",
    nodes: {
      MwZnZwVA3J: {
        x: -575,
        y: -183,
        type: "cron",
        width: 200,
        connections: {
          inputs: {},
          outputs: { trigger: [{ nodeId: "xyz", portName: "trigger" }] },
        },
        inputData: { cron: { num: "5" }, period: { per: "m" } },
        id: "MwZnZwVA3J",
      },
      abcabc: {
        x: -92,
        y: 134,
        type: "names",
        width: 200,
        connections: {
          inputs: {},
          outputs: { string: [{ nodeId: "Oan5KoIZxo", portName: "domain" }] },
        },
        inputData: { string: { string: "example.dapp" } },
        id: "abcabc",
      },
      Oan5KoIZxo: {
        x: 194,
        y: -24,
        type: "web",
        width: 200,
        connections: {
          inputs: {
            domain: [{ nodeId: "abcabc", portName: "string" }],
            files: [{ nodeId: "abc", portName: "files" }],
          },
          outputs: {},
        },
        inputData: { files: { mount: [] }, domain: { string: "" } },
        id: "Oan5KoIZxo",
      },
      xyz: {
        x: -333,
        y: -186,
        type: "git",
        width: 200,
        connections: {
          inputs: { trigger: [{ nodeId: "MwZnZwVA3J", portName: "trigger" }] },
          outputs: { files: [{ nodeId: "abc", portName: "files" }] },
        },
        inputData: {
          repo: { string: "git://orgname/reponame.git" },
          trigger: { trigger: "" },
        },
        id: "xyz",
      },
      abc: {
        x: -92,
        y: -186,
        type: "files",
        width: 200,
        connections: {
          inputs: { files: [{ nodeId: "xyz", portName: "files" }] },
          outputs: { files: [{ nodeId: "Oan5KoIZxo", portName: "files" }] },
        },
        inputData: { mount: { string: "/build" }, files: { mount: [] } },
        id: "abc",
      },
    },
  },
];

const config = new FlumeConfig();
config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [Controls.text({ name: "string", label: "Text" })],
  })
  .addPortType({
    type: "trigger",
    name: "trigger",
    label: "Trigger",
    color: Colors.red,
    controls: [Controls.text({ name: "trigger", label: "Trigger" })],
  })
  .addPortType({
    type: "files",
    name: "files",
    label: "Files",
    color: Colors.blue,
    controls: [
      Controls.multiselect({
        name: "mount",
        label: "Mount",
        options: [{ value: "src", label: "/src" }],
      }),
    ],
  })
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.brown,
    controls: [Controls.text({ name: "num", label: "Num" })],
  })
  .addPortType({
    type: "period",
    name: "period",
    label: "Period",
    color: Colors.yellow,
    controls: [
      Controls.select({
        name: "per",
        label: "Per",
        options: [
          { value: "s", label: "Second(s)" },
          { value: "m", label: "Minutes(s)" },
          { value: "h", label: "Hours(s)" },
          { value: "d", label: "Day(s)" },
          { value: "w", label: "Weeks(s)" },
          { value: "M", label: "Months(s)" },
        ],
      }),
    ],
  })
  .addNodeType({
    type: "cron",
    label: "Scheduler Module",
    description: "Triggers things",
    inputs: (ports: any) => [
      ports.number({ name: "cron", label: "Every" }),
      ports.period(),
    ],
    outputs: (ports: any) => [ports.trigger()],
  })
  .addNodeType({
    type: "names",
    label: "Names Module",
    description: "Outputs a string of text",
    inputs: (ports: any) => [ports.string()],
    outputs: (ports: any) => [ports.string()],
  })
  .addNodeType({
    type: "files",
    label: "Files Module",
    description: "Serves a directory of files",
    inputs: (ports: any) => [
      ports.string({ name: "mount", label: "Mount" }),
      ports.files(),
    ],
    outputs: (ports: any) => [ports.files()],
  })
  .addNodeType({
    type: "git",
    label: "git Integration",
    description: "Pulls files from git",
    inputs: (ports: any) => [
      ports.string({ name: "repo", label: "Repository" }),
      ports.trigger(),
    ],
    outputs: (ports: any) => [ports.files()],
  })
  .addNodeType({
    type: "web",
    label: "Web Module",
    description: "Serves a directory of files",
    inputs: (ports: any) => [
      ports.files(),
      ports.string({ name: "domain", label: "Domain" }),
    ],
  });

export function Flow() {
  const { flow } = useParams();
  const preset = NODES.find((preset) => preset.flow === flow);
  const { nodes, name } = preset
    ? preset
    : { nodes: undefined, name: "Untitled" };
  return (
    <Box p={6}>
      <Heading>
        <Text as={Link} to="/flows" color="brand.teal.500">
          Flows
        </Text>{" "}
        / {name}
      </Heading>
      <Box h="90vh" w="100%">
        <NodeEditor
          portTypes={config.portTypes}
          nodeTypes={config.nodeTypes}
          onChange={(nodes: any) => console.log(JSON.stringify(nodes))}
          nodes={nodes}
        />
      </Box>
    </Box>
  );
}
