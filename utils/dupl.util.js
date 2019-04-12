
module.exports = {
    run (oldData = [], newData = []) {
        let result = [...oldData];
        newData.forEach((n) => {
            let nCmd = n.options ? n.options.cmd : '';
            if (!nCmd) return null;
            let type = true;
            oldData.forEach((o) => {
                let oCmd = o.options.cmd;
                nCmd.forEach((nc) => {
                    oCmd.forEach((oc) => {
                        if (nc === oc)
                            return type = false;
                    })
                });
            });
            if (type)
                result.push(n);
        });
        return result;
    }
};
