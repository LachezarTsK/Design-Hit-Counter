
// The Pair, itself, is applied also as a Linked List Node.
function Pair(timestamp = 0, numberOfHits = 0) {
    this.timestamp = timestamp;
    this.numberOfHits = numberOfHits;
    this.next = null;
}

var HitCounter = function () {
    const TIMESPAN_TO_COUNT_HITS_IN_SECONDS = 300;
    this.head_queuePair = null;
    this.tail_queuePair = null;
    this.totalHits = 0;
};

/** 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function (timestamp) {
    
    if (this.head_queuePair === null) {
        this.head_queuePair = new Pair(timestamp, 1);
        this.tail_queuePair = this.head_queuePair;
    } else if (this.tail_queuePair.timestamp !== timestamp) {
        this.tail_queuePair.next = new Pair(timestamp, 1);
        this.tail_queuePair = this.tail_queuePair.next;
    } else {
        this.tail_queuePair.numberOfHits++;
    }

    this.totalHits++;
};

/** 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function (timestamp) {

    let maxTimestampDifference = (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) > 0 ? 
                                 (timestamp - TIMESPAN_TO_COUNT_HITS_IN_SECONDS + 1) : 0;

    while (this.head_queuePair !== null) {
        if (this.head_queuePair.timestamp < maxTimestampDifference) {
            this.totalHits -= this.head_queuePair.numberOfHits;
            this.head_queuePair = this.head_queuePair.next;
        } else {
            break;
        }
    }
    return this.totalHits;
};
