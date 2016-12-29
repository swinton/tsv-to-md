'use babel';

import {
    CompositeDisposable
} from 'atom';

export default {

    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register tsv-to-md command
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'tsv-to-md:tsv-to-md': () => this.tsvToMd()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    },


    tsvToMd() {
        var editor = atom.workspace.getActiveTextEditor(),
            rows = editor.getSelectedText().trim().split("\n");

        var div = "|" + rows[0].split("\t").map(cell => ":---").join("|") + "|";

        rows = rows.map(function(row) {
            return "|" + row.trim().split("\t").join("|") + "|";
        });

        rows.splice(1, 0, div);

        editor.insertText(rows.join("\n"));
    }

};
