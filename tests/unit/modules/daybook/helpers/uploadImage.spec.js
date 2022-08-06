import "setimmediate";
import cloudinary from "cloudinary";
import axios from "axios";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
  cloud_name: `${process.env.VUE_APP_CLOUDINARY_NAME}`,
  api_key: `${process.env.VUE_APP_CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.VUE_APP_CLOUDINARY_API_SECRET}`,
});

describe("uploadImage Unit Testing", () => {
  test("Should load file and return url", async (done) => {
    // Upload file to Cloudinary
    const { data } = await axios.get(
      "https://res.cloudinary.com/dtw17wnke/image/upload/v1659646420/sample.jpg",
      {
        responseType: "arraybuffer",
      }
    );
    const file = new File([data], "photo.jpg");
    const url = await uploadImage(file);
    expect(typeof url).toBe("string");

    // Delete file from Cloudinary
    const segments = url.split("/");
    const imageID = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(imageID, {}, () => {
      done();
    });
  });
});
