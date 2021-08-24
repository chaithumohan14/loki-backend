import express from "express";
import cors from "cors";
import fileUpload, { UploadedFile } from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(fileUpload({}));

app.post("/", async (req, res) => {
  const fileNamePrefixArray = req.body.email?.split("@") || ["", ""];
  const fileNamePrefix =
    fileNamePrefixArray[0] + "-" + fileNamePrefixArray[1].split(".")[0];
  if (req.files) {
    await (req.files.audio1 as UploadedFile).mv(
      `static/${fileNamePrefix}-1.mp3`
    );
    await (req.files.audio2 as UploadedFile).mv(
      `static/${fileNamePrefix}-2.mp3`
    );
    await (req.files.audio3 as UploadedFile).mv(
      `static/${fileNamePrefix}-3.mp3`
    );
  }
  res.status(200).json({ msg: "Successfull" });
});

app.get("/", (_req, res) => res.json({ msg: "Hello World" }));

app.listen(4000, () => {
  console.log("> Server Started...");
});
