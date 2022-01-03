
import java.util.LinkedList;
import java.util.Deque;

public class HitCounter {

    class Pair<K, V> {

        K key;
        V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    Deque<Pair<Integer, Integer>> hitsPerTimestamp;
    final int TIMESPAN_TO_COUNT_HITS_IN_SECONDS = 300;
    int totalHits;

    public HitCounter() {
        hitsPerTimestamp = new LinkedList<>();
    }

    public void hit(int timestamp) {
        if (hitsPerTimestamp.isEmpty() || hitsPerTimestamp.getLast().key != timestamp) {
            hitsPerTimestamp.addLast(new Pair<>(timestamp, 1));
        } else {
            hitsPerTimestamp.getLast().value++;
        }
        totalHits++;
    }

    public int getHits(int timestamp) {

        int maxTimestampDifference = (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) > 0 ? 
                                     (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) : 0;

        while (!hitsPerTimestamp.isEmpty()) {
            if (hitsPerTimestamp.getFirst().key < maxTimestampDifference) {
                totalHits -= hitsPerTimestamp.pollFirst().value;
            } else {
                break;
            }
        }
        return totalHits;
    }
}
