const axios = require('axios').default;
const cheerio = require('cheerio').default;
const { err, err404 } = require('../../error');
const { baseUrl } = require('../../helpers/data.json');

module.exports = () => {
    try {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/anime/?status=&type=&sub=sub&order=popular`)
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

                    if(hasil.length === 0) return err404(resolve, reject);

                    return resolve({
                        message: 'Sukses!',
                        error: false,
                        data: hasil
                    });
                })
                .catch(er => err404(resolve, reject))
        })
    } catch (error) {
        return err();
    }
}