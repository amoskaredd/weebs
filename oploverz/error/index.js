const err404 = (res, rej, q) => {
    const e = {
        message: `Tidak ada hasil...`,
        error: true,
        data: []
    }

    return res(e);
}

const err = () => {
    const e = {
        message: 'Server sedang sibuk...',
        error: true,
        data: []
    }

    return e;
}

module.exports = {err404, err}