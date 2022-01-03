
#include<queue>
using namespace std;

class HitCounter {
    
public:
    queue<pair<int, int>> hitsPerTimestamp;
    const int TIMESPAN_TO_COUNT_HITS_IN_SECONDS = 300;
    int totalHits;

    HitCounter() {
        totalHits = 0;
    }

    void hit(int timestamp) {
        if (hitsPerTimestamp.empty() || hitsPerTimestamp.back().first != timestamp) {
            hitsPerTimestamp.push(pair<int, int>(timestamp, 1));
        } else {
            hitsPerTimestamp.back().second++;
        }
        totalHits++;
    }

    int getHits(int timestamp) {

        int maxTimestampDifference = (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) > 0 ? 
                                     (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) : 0;

        while (!hitsPerTimestamp.empty()) {
            if (hitsPerTimestamp.front().first < maxTimestampDifference) {
                totalHits -= hitsPerTimestamp.front().second;
                hitsPerTimestamp.pop();
            } else {
                break;
            }
        }
        return totalHits;
    }
};
