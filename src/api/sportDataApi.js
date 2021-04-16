import axios from "axios";

const API_HOST = `https://app.sportdataapi.com/api/v1/soccer`;
// const API_KEY = `7548f260-66c2-11eb-8cf1-cfec162038ad`;
const API_KEY = `b7378ec0-6644-11eb-aa1d-d5b666f6a0bb`;

class sportDataApi {
  constructor() {
    this.api = axios.create({
      baseURL: API_HOST,
      params: { apikey: API_KEY },
    });

    this.cache = JSON.parse(localStorage.getItem("cache")) || {};
    this.clearCache();
  }

  clearCache() {
    const expired = Object.keys(this.cache).filter((url) => {
      return new Date(Date.now()) > new Date(this.cache[url].expire);
    });

    expired.forEach((url) => {
      console.log("delete", url);
      delete this.cache[url];
    });

    // update
    localStorage.setItem("cache", JSON.stringify(this.cache));
  }

  async get(url, config) {
    try {
      if (this.cache[url] && new Date(this.cache[url].expire) > Date.now()) {
        return this.cache[url].data;
      } else {
        const res = await this.api.get(url, config);
        if (res.status !== 200) throw new Error(res.statusText);

        const data = res.data.data;
        const cacheURLs = ["leagues", "countries", "teams"];

        if (
          cacheURLs
            .map((cacheURL) => url.startsWith(`/${cacheURL}`))
            .some(Boolean)
        ) {
          this.cache[url] = {
            data,
            expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          };

          localStorage.setItem("cache", JSON.stringify(this.cache));
        }

        return data;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new sportDataApi();
