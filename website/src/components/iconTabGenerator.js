import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export function generateIconWithLabel({ iconTitle, iconLocation, iconLink }) {
  const generatedLabel = (
    <div style={{ textAlign: "center" }}>
      <a href={iconLink ? iconLink : undefined}>
        <img src={iconLocation} height="48" width="48" />
        <br />
        {iconTitle}
      </a>
    </div>
  );
  return generatedLabel;
}

export function generateIcon({ iconLocation, iconLink }) {
  const generatedLabel = (
    <div style={{ textAlign: "center" }}>
      <a href={iconLink ? iconLink : undefined}>
        <img src={iconLocation} height="48" width="48" />
      </a>
    </div>
  );

  return generatedLabel;
}

const data = {
  js: {
    iconTitle: "JavaScript",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/javascript-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/javascript",
    contentUrl: "",
    content: "",
  },
  java: {
    iconTitle: "Java",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/java-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/jvm",
    contentUrl: "",
    content: "",
  },
  golang: {
    iconTitle: "Golang",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/go-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/go",
    contentUrl: "",
    content: "",
  },
  ruby: {
    iconTitle: "Ruby",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/ruby-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/ruby/readme",
    contentUrl: "",
    content: "",
  },
  dotnet: {
    iconTitle: ".Net",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/csharp-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/net",
    contentUrl: "",
    content: "",
  },
  docker: {
    iconTitle: "Docker",
    iconLocation: "https://www.svgrepo.com/show/331370/docker.svg",
    iconLink: "https://docs.pact.io/docker",
    contentUrl: "",
    content: "",
  },
  kotlin: {
    iconTitle: "Kotlin",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/kotlin-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/jvm",
    contentUrl: "",
    content: "",
  },
  scala: {
    iconTitle: "Scala",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/scala-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/jvm",
    contentUrl: "",
    content: "",
  },
  clojure: {
    iconTitle: "Clojure",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/clojure-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/jvm",
    contentUrl: "",
    content: "",
  },
  python: {
    iconTitle: "Python",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/python-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/python",
    contentUrl: "",
    content: "",
  },
  swift: {
    iconTitle: "Swift and Objective-C",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/swift-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/swift",
    contentUrl: "",
    content: "",
  },
  php: {
    iconTitle: "PHP",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/php-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/php",
    contentUrl: "",
    content: "",
  },
  cplusplus: {
    iconTitle: "C++",
    iconLocation:
      "https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/csharp-original.svg",
    iconLink: "https://docs.pact.io/implementation_guides/cpp",
    contentUrl: "",
    content: "",
  },
};

const label_with_link_javascript = generateIconWithLabel(data["js"]);
const label_with_link_java = generateIconWithLabel(data["java"]);
const label_with_link_golang = generateIconWithLabel(data["golang"]);
const label_with_link_ruby = generateIconWithLabel(data["ruby"]);
const label_with_link_dotnet = generateIconWithLabel(data["dotnet"]);
const label_with_link_docker = generateIconWithLabel(data["docker"]);
const label_with_link_kotlin = generateIconWithLabel(data["kotlin"]);
const label_with_link_scala = generateIconWithLabel(data["scala"]);
const label_with_link_clojure = generateIconWithLabel(data["clojure"]);
const label_with_link_python = generateIconWithLabel(data["python"]);
const label_with_link_swift = generateIconWithLabel(data["swift"]);
const label_with_link_php = generateIconWithLabel(data["php"]);
const label_with_link_cplusplus = generateIconWithLabel(data["cplusplus"]);
const label_javascript = generateIconWithLabel({...data["js"], iconLink: undefined });
const label_java = generateIconWithLabel({...data["java"], iconLink: undefined });
const label_golang = generateIconWithLabel({...data["golang"], iconLink: undefined });
const label_ruby = generateIconWithLabel({...data["ruby"], iconLink: undefined });
const label_dotnet = generateIconWithLabel({...data["dotnet"], iconLink: undefined });
const label_docker = generateIconWithLabel({...data["docker"], iconLink: undefined });
const label_kotlin = generateIconWithLabel({...data["kotlin"], iconLink: undefined });
const label_scala = generateIconWithLabel({...data["scala"], iconLink: undefined });
const label_clojure = generateIconWithLabel({...data["clojure"], iconLink: undefined });
const label_python = generateIconWithLabel({...data["python"], iconLink: undefined });
const label_swift = generateIconWithLabel({...data["swift"], iconLink: undefined });
const label_php = generateIconWithLabel({...data["php"], iconLink: undefined });
const label_cplusplus = generateIconWithLabel({...data["cplusplus"], iconLink: undefined });
const icon_javascript = generateIcon({ ...data["js"], iconLink: undefined });
const icon_java = generateIcon({ ...data["java"], iconLink: undefined });
const icon_golang = generateIcon({ ...data["golang"], iconLink: undefined });
const icon_ruby = generateIcon({ ...data["ruby"], iconLink: undefined });
const icon_dotnet = generateIcon({ ...data["dotnet"], iconLink: undefined });
const icon_docker = generateIcon({ ...data["docker"], iconLink: undefined });
const icon_kotlin = generateIcon({ ...data["kotlin"], iconLink: undefined });
const icon_scala = generateIcon({ ...data["scala"], iconLink: undefined });
const icon_clojure = generateIcon({ ...data["clojure"], iconLink: undefined });
const icon_python = generateIcon({ ...data["python"], iconLink: undefined });
const icon_swift = generateIcon({ ...data["swift"], iconLink: undefined });
const icon_php = generateIcon({ ...data["php"], iconLink: undefined });
const icon_cplusplus = generateIcon({
  ...data["cplusplus"],
  iconLink: undefined,
});
const icon_with_link_javascript = generateIcon(data["js"]);
const icon_with_link_java = generateIcon(data["java"]);
const icon_with_link_golang = generateIcon(data["golang"]);
const icon_with_link_ruby = generateIcon(data["ruby"]);
const icon_with_link_dotnet = generateIcon(data["dotnet"]);
const icon_with_link_docker = generateIcon(data["docker"]);
const icon_with_link_kotlin = generateIcon(data["kotlin"]);
const icon_with_link_scala = generateIcon(data["scala"]);
const icon_with_link_clojure = generateIcon(data["clojure"]);
const icon_with_link_python = generateIcon(data["python"]);
const icon_with_link_swift = generateIcon(data["swift"]);
const icon_with_link_php = generateIcon(data["php"]);
const icon_with_link_cplusplus = generateIcon(data["cplusplus"]);

export const languageIconsWithLabels = {
  label_javascript,
  label_java,
  label_golang,
  label_ruby,
  label_dotnet,
  label_docker,
  label_kotlin,
  label_scala,
  label_clojure,
  label_python,
  label_swift,
  label_php,
  label_cplusplus,
  label_with_link_javascript,
  label_with_link_java,
  label_with_link_golang,
  label_with_link_ruby,
  label_with_link_dotnet,
  label_with_link_docker,
  label_with_link_kotlin,
  label_with_link_scala,
  label_with_link_clojure,
  label_with_link_python,
  label_with_link_swift,
  label_with_link_php,
  label_with_link_cplusplus,
};

export const languageIcons = {
  icon_javascript,
  icon_java,
  icon_golang,
  icon_ruby,
  icon_dotnet,
  icon_docker,
  icon_kotlin,
  icon_scala,
  icon_clojure,
  icon_python,
  icon_swift,
  icon_php,
  icon_cplusplus,
  icon_with_link_javascript,
  icon_with_link_java,
  icon_with_link_golang,
  icon_with_link_ruby,
  icon_with_link_dotnet,
  icon_with_link_docker,
  icon_with_link_kotlin,
  icon_with_link_scala,
  icon_with_link_clojure,
  icon_with_link_python,
  icon_with_link_swift,
  icon_with_link_php,
  icon_with_link_cplusplus,
};

export function generateTabItem({ key, content, withLabel, withLink = false }) {
  const dataToRetrieve = withLink
    ? data[key]
    : { ...data[key], iconLink: undefined };

  const iconGenerator = withLabel
    ? generateIconWithLabel(dataToRetrieve)
    : generateIcon(dataToRetrieve);

  const generatedTab = (
    <TabItem value={key} label={iconGenerator}>
      {iconGenerator.content ? iconGenerator.content : content}
    </TabItem>
  );
  return generatedTab;
}

export function generateTab({ withLabel, withLink }) {
  const generatedTab = (
    <Tabs groupId="languages">
      {generateTabItem({ key: "js", content: `###js`, withLabel, withLink })}
      {generateTabItem({ key: "java", content: `###js`, withLabel, withLink })}
      {generateTabItem({ key: "golang", content: `###golang`, withLabel, withLink })}
      {generateTabItem({
        key: "ruby",
        content: `###ruby`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        key: "cplusplus",
        content: `###C++`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        key: "docker",
        content: `###Docker`,
        withLabel,
        withLink,
      })}
    </Tabs>
  );
  return generatedTab;
}

