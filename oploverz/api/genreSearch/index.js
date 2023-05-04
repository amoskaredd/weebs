const axios = require('axios').default;
const cheerio = require('cheerio').default;
const { err, err404 } = require('../../error');
const { baseUrl } = require('../../helpers/data.json');

module.exports = (query) => {
    try {
        if (!query) throw new Error('Mohon masukkan genre!');
        return new Promise((resolve, reject) => {
            const q = query.trim().split(/ +/g);

            axios.get(`${baseUrl}/anime/?genre%5B%5D=${q.join('-')}&status=&type=&sub=sub&order=popular`)
                .then(resp => {
                    if (resp.status !== 200) return err();

                    const data = resp.data;
                    const $ = cheerio.load(data);
                    let hasil = [];

                    $('.listupd article.bs').each(function (a, b) {
                        hasil[a] = {
                            judul: $(this).find('.bsx').find('a').attr('title'),
                            type: $(this).find('.bsx').find('a').find('.limit').find('.typez').text().trim(),
                            status: $(this).find('.bsx').find('a').find('.limit').find('.bt').find('.epx').text().trim(),
                            url: $(this).find('.bsx').find('a').attr('href'),
                            thumb: $(this).find('.bsx').find('a').find('.limit').find('img').attr('src')
                        }
                    })

                    if(hasil.length === 0) return err404(resolve, reject, query);

                    return resolve({
                        message: 'Sukses!',
                        error: false,
                        data: hasil
                    });
                })
                .catch(er => {
                    resolve({
                        message: `Genre tidak ditemukan...`,
                        error: true,
                        data: []
                    })
                })
        })
    } catch (error) {
        return err();
    }
}