
import path from 'path'
import cmd from '../index'

cmd({
    cmdPath: path.join(__dirname, '../lib'),
    options: {
        include: ['cmd.js'],
        exclude: [],
    }
});
