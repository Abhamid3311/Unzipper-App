import "./App.css";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import Tree from "./components/Tree";
import useDrivePicker from "react-google-drive-picker/dist";
import JSZipUtils from "jszip-utils";

function App() {
  const [about, setAbout] = useState({});
  const [details, setDetails] = useState();
  const [openPicker, authResponse] = useDrivePicker();
  const reader = new FileReader();
  const errorSection = document.getElementById("errorSection");
  if (errorSection) {
    errorSection.style.display = "none";
  }

  localStorage.removeItem("item");
  let i = 20;

  const extensions = [
    "7z",
    "zipx",
    "rar",
    "tar",
    "exe",
    "dmg",
    "iso",
    "zip",
    "msi",
    "nrg",
    "gz",
    "cab",
    "bz2",
    "wim",
    "ace",
    "alz",
    "ar",
    "arc",
    "arj",
    "bin",
    "cdi",
    "chm",
    "cpt",
    "cpio",
    "cramfs",
    "crunch",
    "deb",
    "dd",
    "dms",
    "ext",
    "fat",
    "format",
    "gpt",
    "hfs",
    "ihex",
    "lbr",
    "lzh",
    "lzma",
    "lzm",
    "mbr",
    "mdf",
    "nsa",
    "nds",
    "nsis",
    "ntfs",
    "pit",
    "pak",
    "pdf",
    "pp",
    "qcow2",
    "rpm",
    "sar",
    "squashfs",
    "squeeze",
    "sit",
    "sitx",
    "swf",
    "udf",
    "uefi",
    "vdi",
    "vhd",
    "vmdk",
    "warc",
    "xar",
    "xz",
    "z",
    "zoo",
    "zi",
    "jar",
  ];
  const handleCount = () => {
    document.getElementById("extensions").innerHTML = extensions
      .slice(0, extensions.length)
      .map((extension) => extension + ", ");
  };
  // handle button click

  const input = () => {
    let getInput = document.createElement("input");
    getInput.type = "file";
    getInput.click();
    getInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (
        file?.name.includes(".zip") ||
        file?.name.includes(".7z") ||
        file?.name.includes(".dmg") ||
        file?.name.includes(".zipx") ||
        file?.name.includes(".rar") ||
        file?.name.includes(".tar") ||
        file?.name.includes(".exe")
      ) {
        setAbout(file);
        JSZip.loadAsync(file).then((data) => {
          setDetails(data.files);
        });
      } else {
        document.getElementById("details-section").style.display = "block";
        document.getElementById("container").style.display = "none";
        document.getElementById("errorSection").style.display = "flex";
        document
          .getElementById("details-section")
          .classList.add("text-rose-500");
        document.getElementById("details-section").innerText =
          "Unsupported File Format";
      }
    });
  };

  // handle drag and drop
  const handleUploads = (e) => {
    if (
      e?.name.includes(".zip") ||
      e?.name.includes(".7z") ||
      e?.name.includes(".dmg") ||
      e?.name.includes(".zipx") ||
      e?.name.includes(".rar") ||
      e?.name.includes(".tar") ||
      e?.name.includes(".exe")
    ) {
      setAbout(e);
      JSZip.loadAsync(e).then((data) => {
        setDetails(data.files);
      });
    } else {
      document.getElementById("details-section").style.display = "block";
      document.getElementById("container").style.display = "none";
      document.getElementById("errorSection").style.display = "block";
      document.getElementById("details-section").classList.add("text-rose-500");
      document.getElementById("details-section").innerText =
        "Unsupported File Format";
    }
  };

  const handleDrivePicker = () => {
    console.log("first");
    openPicker({
      clientId:
        "143162536873-dnf0graln9fs210m2utir1cfisbq3g8i.apps.googleusercontent.com",
      developerKey: "AIzaSyBXY15X39ayQfZrVv69H43HeoW3VaOJ7j0",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };

  const handleURLUpload = () => {
    const link = prompt("Enter a URL to upload", "https://");

    new JSZip.external.Promise(
      JSZipUtils.getBinaryContent(link, {}).then((data) => console.log(data))
    );
    // if (link.length > 8) {
    //   reader.readAsArrayBuffer(link);
    // }
  };

  useEffect(() => {
    if (details) {
      setDetails(details);
    }
  }, [details]);

  return (
    <div className="h-screen">
      <div className="container lg:w-1/2 mx-auto" id="container">
        <div className="header-text py-10">
          <h1 className="text-3xl font-bold text-center flex justify-center items-center">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2907.15 2334.32'%3E%3Cpath d='M1183.24 1320.8h10.9c40.7 0 81.3-.1 122 .1 6.6 0 13.5.6 19.7 2.7 27.2 9 38.2 41.3 22.5 65.4a95.61 95.61 0 01-6.7 8.7q-81.9 98.4-163.9 196.7c-2.1 2.5-4.1 5.2-6.7 8.4 3.2 5 6.3 10.1 9.6 15q81.3 121.8 162.5 243.7a112.37 112.37 0 017.4 11.9 43.63 43.63 0 01-31.9 63.4 92.72 92.72 0 01-13.9.9c-37.7.1-75.3 0-113 0h-12.3v345.4c0 4.3.2 8.7-.5 13-3.3 21.3-20.1 36.4-41.7 37.9-3.3.2-6.7.1-10 .1h-916c-25.2-.6-43.4-17.9-45.1-43-.2-3.7-.1-7.3-.1-11v-342.3H50.64a91.87 91.87 0 01-13.9-.9c-29.1-4.7-45.2-36.2-32.1-62.7a96.3 96.3 0 016.3-10.2q74.85-112.35 149.7-224.6c2-3 4-6.1 6.4-9.8-2-3.2-4-6.6-6.2-9.8Q86 1507.45 11.14 1395.2c-3.7-5.5-7.3-11.4-9.2-17.6-8.3-27.5 11-54.3 40.3-56.4 3.3-.2 6.7-.1 10-.1H352c5.3-17.5 10.2-34.1 15.4-50.5C496.9 861.1 837 540.5 1253.8 435.1a1270.52 1270.52 0 01189.8-32.9 1225.2 1225.2 0 01202.7-3.1c232.1 16.1 444.6 89.4 634.8 223.5q362.55 255.6 488.9 682c19 64.3 31.9 130 39.9 196.6a1335.11 1335.11 0 019.2 158.6v585.6c3.2.3 5.8.8 8.3.8 12 .1 24-.2 36 .1 24.5.6 43.2 19.2 43.7 43 .5 23.5-17.9 43.2-42.1 44.9-3 .2-6 .1-9 .1q-411.45 0-823-.1a79.83 79.83 0 01-16.9-1.4c-21.1-4.6-35.9-24.6-34.2-45.5 1.9-22.7 19.3-40 41.7-40.9 11.6-.5 23.3-.1 35-.2h10.5c.3-3.7.8-6.6.8-9.5 0-197 .8-394-.3-591-1.1-202.9-126-385.7-314.1-462.8-76-31.1-155.1-43.5-236.8-35.8-129.9 12.3-239.2 67.1-328.3 162.4-2.9 3.1-5.6 6.3-8.4 9.5a4.74 4.74 0 011.24 1.8zm-652.7 263.5c1-10.8 1.9-20.3 2.7-29.9a1000.79 1000.79 0 0135-187.3c116.7-407.9 478.7-716.4 922-748.3a1037.12 1037.12 0 01213.5 7 1020.22 1020.22 0 01262.2 71.9 1036.72 1036.72 0 01633 954.5q.15 290 0 580v12.4c13.9 2.4 124.8 1.7 132.2-.8v-10.7-575a1226.17 1226.17 0 00-7-132.7c-7.6-70.4-21.1-139.6-41.8-207.3q-111.3-365-414.5-596.5c-184.9-140.9-394.4-218.2-626.3-234.7a1136.53 1136.53 0 00-191.7 3.1c-65.5 6.4-130 17.7-193.3 35.5Q858 637.55 615 973c-130 180-201.2 381.8-215.9 603.5-.2 2.5 0 5.1 0 7.9 44.14-.1 87.34-.1 131.44-.1zm219.7-.1c4.8-31.2 8.2-61.4 14.1-91.1 27.9-140.2 88-265.2 182.1-372.9 146.9-168.2 332.4-262.1 555-281.4 79.2-6.9 157.9-1 235.5 16.1 268.6 59.1 488.2 247.7 587.5 504.2 37.2 96.2 54.4 196 54.3 299.1q-.45 286.5-.1 573c0 4.5.3 9.1.5 14h131.6v-589.4a982.55 982.55 0 00-8.6-131.6 939.23 939.23 0 00-64.4-237.4c-132.6-317.2-436.5-553.3-806.3-580.2a943.92 943.92 0 00-533.3 120.3c-259.8 147.2-449.7 417.6-478 743.5-.4 4.5 0 9 0 13.7 44 .1 87.2.1 130.1.1zm222.3 0c.4-2.2.7-3.5 1-4.8 5-26.5 8.5-53.4 15.4-79.4 64.4-243.3 272.6-418.6 523.6-441.2 77.6-7 153.7 1.5 228.1 24.7 244.4 76.1 418.5 304.8 417.8 567.9-.1 39.7 0 79.3 0 119v462c0 4.2.3 8.4.4 12.8h131.6v-12.4-581a726.87 726.87 0 00-22.6-181c-74.4-291-328.5-518.8-647.6-544.1a709.26 709.26 0 00-189.1 10.1c-145.1 27.6-270.9 92.9-376.2 196.5-113 111.2-182.3 245.6-208.6 402.1-2.7 16-4.2 32.1-6.4 48.8h132.6zm128.3 353.4h-13.9q-177 0-353.9.1c-21.4 0-36.6-8.4-47.3-27.1-34.7-60.4-70-120.4-105.1-180.5-1.7-3-3.7-5.8-6.2-9.6-2.3 15.8-1.6 517.8.6 524.7h525.9c-.1-102.4-.1-204.3-.1-307.6zm-450.2-263.7c1.6 3.3 2.6 5.7 3.8 7.9q46.8 80.25 93.5 160.6c3.4 6 7.6 7.1 13.8 7q232.95-.15 465.8-.1c3.2 0 6.4-.3 10.7-.5-2.2-3.7-3.6-6.3-5.2-8.7q-53.25-79.8-106.3-159.7c-3.5-5.4-7.3-7.4-13.7-7.4q-226.35.3-452.8.2c-2.9 0-5.8.4-9.6.7zm-523.4 174.9c4.2.3 6.8.6 9.4.6q114 0 228 .1c6 0 9.7-1.9 13-6.9q53.85-81.3 108-162.2a74.5 74.5 0 003.7-7.2h-11.1c-74.7 0-149.3.1-224-.2-7.6 0-12 2.3-16.1 8.7q-52 78.9-104.6 157.3c-1.8 2.7-3.6 5.5-6.3 9.8zM2708.84 704.3c-6.6 0-10.9-3.3-13.6-11-4.2-11.9-8.5-23.8-12-36-5.7-19.6-17.9-32-37.7-37.4-11.9-3.2-23.4-7.6-35-11.6-8.4-2.9-11.6-7.2-11.5-14.3.1-6.7 3.3-10.8 11.2-13.5 12.6-4.3 25.2-8.6 37.9-12.5 17.6-5.5 29-16.7 34.3-34.5 3.8-12.7 8.5-25.2 12.6-37.9 1.9-5.9 5.2-10 11.5-11.1 7.1-1.3 13 2.4 15.9 10.5 4.5 12.5 8.9 25.1 12.7 37.8 5.4 18.6 17.3 30.1 35.8 35.5 12.8 3.8 25.4 8 37.9 12.6 9.6 3.5 13.4 13.2 7.9 20.7-2.2 3-6 5.3-9.5 6.6-12.2 4.4-24.5 8.6-36.9 12.3-18 5.4-29.7 16.8-35 35-3.8 12.8-8.2 25.3-12.7 37.8-2.7 7.7-7.2 11-13.8 11zM903.14 0c6.8 0 10.9 3.1 13.7 11 3.8 10.7 7.2 21.4 10.8 32.2 1.2 3.5 2.4 6.9 3.6 10.4 5 14.1 14.7 23.6 28.7 28.5 12.2 4.3 24.6 8.2 36.9 12.3 2.2.7 4.5 1.4 6.6 2.3 6.5 2.7 10.1 7.7 9.8 13.6-.4 6.2-3.5 10.7-9.5 12.8-5 1.8-10.1 3.5-15.1 5.1-9.5 3.2-18.9 6.3-28.4 9.5-14.5 4.9-24.3 14.7-29.3 29.2-4.3 12.6-8.5 25.2-12.8 37.8-.7 2.2-1.4 4.4-2.3 6.6a13.76 13.76 0 01-25.6 0c-2.5-6.5-4.5-13.2-6.8-19.8-2.5-7.6-5.2-15.1-7.6-22.7-5.1-16.2-15.8-26.6-31.8-31.8-13-4.2-25.9-8.5-38.9-12.8-5.3-1.7-9.8-4.3-11.5-10.1-2.3-8 1.3-14.6 10.2-17.8 11.9-4.2 23.8-8.5 36-11.9 19.7-5.5 32-17.9 37.6-37.5 3.5-12.1 7.8-24 12-36 2.8-7.9 6.9-10.9 13.7-10.9z'/%3E%3Cpath d='M308.24 1122.3c.2 6.9-2.8 11.3-10.4 14-11.9 4.2-23.8 8.5-36 11.9-19.7 5.5-32.1 17.7-37.8 37.3-3.6 12.5-7.9 24.7-12.3 36.9-3.1 8.7-10.3 12.2-18.1 9.4-5.2-1.8-7.7-6.1-9.3-11-4.1-12.3-8.6-24.5-12.2-36.9-5.3-18.2-16.9-29.6-35-35-11.2-3.3-22.1-7.2-33.2-10.9-2.2-.7-4.5-1.4-6.6-2.3-5.8-2.4-9.1-7-9-13.2s3.2-10.8 9.3-12.9c8.8-3.1 17.6-6 26.4-9 5-1.7 10.1-3.3 15.2-4.9 16.5-5.2 27.1-16.2 32.3-32.6 3.3-10.5 6.9-20.8 10.3-31.3.8-2.5 1.6-5.1 2.5-7.6 3-8 7.7-12.1 14.3-11.7 7.2.4 11.4 4.6 13.5 11.4 1.6 5.4 3.6 10.7 5.4 16.1 2.8 8.5 5.5 17.1 8.5 25.6 5.1 14.4 14.7 24.3 29.2 29.2 13.9 4.7 27.8 9.2 41.6 13.9 8 2.9 11.16 6.9 11.4 13.6zM1563.74 1453.1c6.4 0 11.1 3.5 13.7 11 4.3 12.2 8.6 24.5 12.2 36.9 5.5 18.9 17.4 30.8 36.4 36.2 12.1 3.4 24 7.9 36 11.9 4.6 1.5 8.5 3.7 10.6 8.4 3.4 7.8-.1 15.8-9.1 19-12.5 4.5-25.3 8.2-37.8 12.8a88.72 88.72 0 00-19.5 9.7c-7.6 5.2-12.1 13.1-15 21.9-4.4 13.6-9.1 27.1-13.6 40.7-1.8 5.3-4.5 9.6-10.4 11-7.8 1.8-14.1-1.5-17.1-10-4.4-12.2-8.7-24.5-12.3-36.9-5.5-19.4-17.7-31.3-37-36.9-12.4-3.6-24.7-7.9-36.9-12.3-7.6-2.7-11.1-8.3-10.2-15.1.9-6.3 4.8-10 10.6-11.9 12.6-4.2 25.1-8.9 37.9-12.6 18.2-5.3 29.6-16.9 35.1-34.9 3.9-12.7 8.2-25.3 12.5-37.9 2.7-7.5 7.5-11 13.9-11z'/%3E%3C/svg%3E"
              alt=""
              className="w-20"
            />
            Archive Extractor
          </h1>
          <p className="text-center">
            Archive Extractor is a small and easy online tool that can extract
            over 70 types of compressed <br /> files, such as 7z, zipx, rar,
            tar,exe,dmg and much more.
          </p>
        </div>

        <div className={`${details ? "hidden" : "block"}`}>
          <div
            className={`mx-auto bg-white w-3/4 py-20 border border-1 rounded`}
            id="fileSection"
          >
            <div id="upload-section" className="text-center">
              <button
                onClick={() => input()}
                type="file"
                className="bg-blue-600 text-white px-16 py-3 rounded-md"
              >
                <div className="text-xl">Choose File</div>
                <small className="text-light">From Your Computer</small>
              </button>
            </div>

            <div
              id="online-storages-container"
              className="text-center flex justify-center gap-4 my-3"
            >
              <span
                id="gDrive"
                className="hover:text-blue-500 hover:underline flex items-center gap-2 cursor-pointer"
                onClick={handleDrivePicker}
              >
                <div className="gdrive-icon"></div> From Google Drive
              </span>
              <a href="g" className="hover:text-blue-500 hover:underline">
                <i class="fa-brands fa-dropbox"></i> Dropbox
              </a>
              <span
                href="g"
                className="hover:text-blue-500 hover:underline flex items-center cursor-pointer"
                onClick={handleURLUpload}
              >
                <i class="fa-solid fa-link text-slate-700 hover:text-slate-900"></i>{" "}
                URL
              </span>
            </div>

            <div className="flex justify-center">
              <div id="drop_zone demo">
                <input
                  type="file"
                  onChange={(e) => handleUploads(e.target.files[0])}
                  id="file"
                  onClick={(e) => e.preventDefault()}
                  className="custom-file-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="details-section" className={details ? "block" : "hidden"}>
          <h1 className="text=2xl font-bold">Name: {about?.name}</h1>
          <h1 className="text=2xl font-bold">
            Size: {(about?.size / (1024 * 1024)).toString().slice(0, 3)}MB
          </h1>
        </div>
        <div id="tree jstree">
          {details ? <Tree data={[details]}></Tree> : ""}
        </div>
        <div className="text-center mx-auto mt-10">
          <div className="py-2">
            <h1 className="font-bold ">Supported Formats</h1>
            <div id="extensions">
              {extensions.slice(0, 20).map((extension) => extension + ", ")}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={handleCount}
              >
                ...see more
              </span>
            </div>
          </div>
          <h1 className="font-bold">Supports password-protected archives</h1>
          <h1 className="font-bold">
            Can unpack multi-part archives (zip.001, rar.part1, z01, etc)
          </h1>
        </div>
      </div>

      <div
        id="errorSection"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-2xl">
          You have Selected Unsupported file format{" "}
          <span
            className="cursor-pointer text-blue-500 underline"
            onClick={() => window.location.reload()}
          >
            Reload
          </span>
        </h1>
      </div>
    </div>
  );
}

export default App;
