import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { generateIconWithLabel, generateIcon } from "./iconGenerator";

function generateTabItem({
  data,
  key,
  content = undefined,
  withLabel = false,
  withLink = false,
}) {
  const retrievedData = withLink
    ? data[key]
    : { ...data[key], iconLink: undefined };

  const iconGenerator = withLabel
    ? generateIconWithLabel(retrievedData)
    : generateIcon(retrievedData);

  const generatedTab = (
    <TabItem value={key} label={iconGenerator}>
      {iconGenerator.content ? iconGenerator.content : content}
    </TabItem>
  );
  return generatedTab;
}

function generateGettingStartedTab({ data, withLabel, withLink }) {
  const generatedTab = (
    <Tabs groupId="languages">
      {generateTabItem({
        data,
        key: "js",
        content: `### js`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        data,
        key: "java",
        content: `### js`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        data,
        key: "golang",
        content: `### golang`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        data,
        key: "ruby",
        content: `### ruby`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        data,
        key: "cplusplus",
        content: `### C++`,
        withLabel,
        withLink,
      })}
      {generateTabItem({
        data,
        key: "docker",
        content: `### Docker`,
        withLabel,
        withLink,
      })}
    </Tabs>
  );
  return generatedTab;
}

function generateLanguageTab({ data, withLabel, withLink }) {
  const generatedTab = (
    <Tabs groupId="languages">
      {Object.keys(data).map((key) => {
        return generateTabItem({
          data,
          key,
          content: <a href={data[key].iconLink}>{data[key].iconTitle} Implemenation Guide</a>, // for demo, need to add our own content
          withLabel,
          withLink,
        });
      })}
    </Tabs>
  );
  return generatedTab;
}

export { generateTabItem, generateGettingStartedTab, generateLanguageTab };
