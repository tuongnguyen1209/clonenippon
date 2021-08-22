const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

exports.getColor = (req, res) => {
  let diachi = `https://www.nipponpaint.com.my/colours/explore`;

  request(diachi, function (error, response, body) {
    const options = {
      uri: diachi,
      transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
      },
    };
    (async function crawler() {
      try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        var $ = await rp(options);
      } catch (error) {
        return res.status(400).json({
          status: "fail",
          error: true,
          message: error,
        });
      }

      //title
      let list = $("#colour-family-13 ul li");
      console.log(list.length);
      let data = [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let color = $(element)
          .find(".colour-cube-roll .colour-cube a")
          .attr("style")
          .split(":")[1]
          .split(";")[0]
          .trim();

        let name = $(element).text().trim().split("  ")[0];
        data.push({
          name,
          colorcode: color,
          desc: "Đây là màu sơn bản quyền thuộc Nippon",
        });
        // console.log("Mau: ", color, name);
      }

      fs.writeFile("./nhom7.json", JSON.stringify(data), "utf8", () => {
        console.log("Import xong");
      });
      // console.log(listMovie);
      res.status(200).send(body);
      //   res.status(200).json(datas);
    })();
  });
};

const getProductInfo = async (link) => {
  let diachi = link;

  const options = {
    uri: diachi,
    transform: function (body) {
      //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
      return cheerio.load(body);
    },
  };
  let $;
  async function crawler() {
    try {
      // Lấy dữ liệu từ trang crawl đã được parseDOM
      $ = await rp(options);
    } catch (error) {
      console.log(error);
    }

    let info = $(".product-page-detail__right__information .field-item")
      .text()
      .trim()
      .toString()
      .replace("\n", "<br>");
    let tinhchat = $(".product-page-detail__right__video .field-item")
      .text()
      .trim()
      .toString()
      .replace(/\n/g, "<br>");

    return { info, tinhchat };
  }
  return await crawler();
};

exports.getProduct = (req, res) => {
  const { loai } = req.query;
  //   console.log(loai);
  let diachi = `https://nipponpaint.com.vn/vi/${loai}?tid=All`;

  request(diachi, function (error, response, body) {
    const options = {
      uri: diachi,
      transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
      },
    };
    (async function crawler() {
      try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        var $ = await rp(options);
      } catch (error) {
        return res.status(400).json({
          status: "fail",
          error: true,
          message: error,
        });
      }

      let listProduct = $(".product-inner .item-list ul li");

      //   console.log(listProduct.length);
      let data = [];
      for (let i = 0; i < listProduct.length; i++) {
        const element = listProduct[i];
        let name = $(element).find(".nip-product-content  h2 a").text().trim();
        let link = $(element).find(".nip-product-content  h2 a").attr("href");
        let images = $(element).find(".nip-product-img  img").attr("src");
        let category = $(element)
          .find(".nip-product-content  .field-field-product-code")
          .text()
          .trim();
        let info = await getProductInfo(`https://nipponpaint.com.vn${link}`);
        data.push({
          name,
          link: `https://nipponpaint.com.vn${link}`,
          category,
          images: `https://nipponpaint.com.vn/${images}`,
          ...info,
        });
      }

      //   res.status(200).send(body);
      res.status(200).json({ status: "success", data });
    })();
  });
};
