import React from "react";

const downloadBaseURL = "https://download.pactflow.io/ai/dist"

const redirectDownload = (osarch, filename) => {
  fetch(`${downloadBaseURL}/${osarch}/latest`)
    .then((res) => res.blob())
    .then((res) => res.text())
    .then((v) => v.trim())
    .then((v) => {console.log(`Latest version of CLI: ${v}, downloading for ${osarch}/${filename}`); return v})
    .then((version) => {
      console.info(`downloading file: ${downloadBaseURL}/${osarch}/${version}/${filename}`)
      var a = document.createElement('a');
      a.href = `${downloadBaseURL}/${osarch}/${version}/${filename}`;
      a.download = filename;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();    
      a.remove();  //afterwards we remove the element again         
    })
}
// our .dev specific react-table
const AiDownloadTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>OS</th>
          <th>Architecture</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>Apple Darwin</td>
            <td>aarch64</td>
            <td><button onClick={() => redirectDownload("aarch64-apple-darwin", "pactflow-ai")}>download</button></td>
        </tr>
        <tr>
            <td>Apple Darwin</td>
            <td>x86_64</td>
            <td><button onClick={() => redirectDownload("x86_64-apple-darwin", "pactflow-ai")}>download</button></td>
        </tr>
        <tr>
            <td>Windows MSVC</td>
            <td>x86_64</td>
            <td><button onClick={() => redirectDownload("x86_64-pc-windows-msvc", "pactflow-ai.exe")}>download</button></td>
        </tr>
        <tr>
            <td>Windows MSVC</td>
            <td>aarch64</td>
            <td><button onClick={() => redirectDownload("aarch64-pc-windows-msvc", "pactflow-ai.exe")}>download</button></td>
        </tr>
        <tr>
            <td>Linux GNU</td>
            <td>x86_64</td>
            <td><button onClick={() => redirectDownload("x86_64-unknown-linux-gnu", "pactflow-ai")}>download</button></td>
        </tr>
        <tr>
            <td>Linux MUSL</td>
            <td>x86_64</td>
            <td><button onClick={() => redirectDownload("x86_64-unknown-linux-musl", "pactflow-ai")}>download</button></td>
        </tr>
        <tr>
            <td>Linux GNU</td>
            <td>aarch64</td>
            <td><button onClick={() => redirectDownload("aarch64-unknown-linux-gnu", "pactflow-ai")}>download</button></td>
        </tr>
        <tr>
            <td>Linux MUSL</td>
            <td>aarch64</td>
            <td><button onClick={() => redirectDownload("aarch64-unknown-linux-musl", "pactflow-ai")}>download</button></td>
        </tr>
      </tbody>
    </table>
  );
};

export default AiDownloadTable;