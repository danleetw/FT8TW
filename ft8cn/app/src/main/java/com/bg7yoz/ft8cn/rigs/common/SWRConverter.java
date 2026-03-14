package com.bg7yoz.ft8cn.rigs.common;

public class SWRConverter {

    public static class CalEntry {
        public int raw;
        public float val;

        public CalEntry(int raw, float val) {
            this.raw = raw;
            this.val = val;
        }
    }

    private final CalEntry[] table;

    public SWRConverter(CalEntry[] table) {
        this.table = table;
    }

    public float convert(int raw) {
        if (table == null || table.length == 0) return raw;

        int i = 0;
        while (i < table.length && raw >= table[i].raw) i++;

        if (i == 0) return table[0].val;
        if (i == table.length) return table[table.length - 1].val;

        CalEntry a = table[i - 1];
        CalEntry b = table[i];

        float rawDelta = (float) (b.raw - a.raw);
        if (rawDelta == 0) return b.val;

        float valDelta = (b.val - a.val);
        float t = (raw - a.raw) / rawDelta;

        return a.val + (valDelta * t);
    }
}