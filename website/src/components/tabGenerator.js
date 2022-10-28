import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { generateIconWithLabel, generateIcon } from "./iconGenerator";
import { tableData } from "../data/examples.table";
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
    <TabItem value={key} label={iconGenerator} key={key}>
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

function generateLanguageTab({ data, withLabel, withLink, useCaseFilter }) {
  const generatedTab = (
    <Tabs groupId="languages">
      {Object.keys(data).map((key) => {
        return generateTabItem({
          data,
          key,
          content: (
            <div>
              <a href={data[key].iconLink}>
                Pact Language implementation guide for {data[key].iconTitle}
              </a>
              <p />
              Demo applications:
              <p />
              {tableData
                .filter(
                  (tr) =>
                    tr.language === data[key].iconTitle &&
                    tr.useCase !== useCaseFilter
                )
                .map((tr) => {
                  return (
                      <li key={tr.linkTitle + "language_link" + Math.random()}>
                        <a href={tr.linkUrl}>{tr.linkTitle}</a>
                      </li>
                  );
                })}
            </div>
          ), // for demo, need to add our own content
          withLabel,
          withLink,
        });
      })}
    </Tabs>
  );
  return generatedTab;
}

function generateTestingToolsTab({ data, withLabel, withLink, side }) {
  const generatedTestingTab = (
    <Tabs groupId="testing_tools">
      {Object.keys(data)
        .filter((x) => (side && data[x].side === side) ?? true)
        .map((key) => {
          return generateTabItem({
            data,
            key,
            content: (
              <a href={data[key].iconLink} key={key}>
                Pactflow {data[key].side} side demo with {data[key].iconTitle}
              </a>
            ), // for demo, need to add our own content
            withLabel,
            withLink,
          });
        })}
    </Tabs>
  );
  return generatedTestingTab;
}

export {
  generateTabItem,
  generateGettingStartedTab,
  generateLanguageTab,
  generateTestingToolsTab,
};
