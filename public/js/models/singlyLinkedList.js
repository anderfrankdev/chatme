class SinglyLinkedListNode{
	constructor(data){
       this.data = data;
       this.next = null;
    }
}

export class SinglyLinkedList{
	constructor(){
        this.head = null;
        this.size = 0;
    }
    isEmpty(){
          return this.size == 0;
    }
    insert(value) {
        if (this.head === null) {
            this.head = new SinglyLinkedListNode(value);
        } else {
            var temp = this.head;
            this.head = new SinglyLinkedListNode(value);
            this.head.next = temp;
        }
        this.size+=1;
    }
    remove(value) {
        var currentHead = this.head;
        if (currentHead.data == value) {
            // just shift the head over. Head is now this new value
            this.head = currentHead.next;
            this.size--;
        } else {
            var prev = currentHead;
            while (currentHead.next) {
                if (currentHead.data == value) {
                    // remove by skipping
                    prev.next = currentHead.next;
                    prev = currentHead;
                    currentHead = currentHead.next;
                    break; // break out of the loop
                }
                prev = currentHead;
                currentHead = currentHead.next;
            }
            //if wasn't found in the middle or head, must be tail
            if (currentHead.data == value) {
                prev.next = null;
            }
            this.size--;
        }
    }
    forEach(callback){
        let current = this.head
        while(current!=null){
            callback(current)
            current=current.next
        }
    }
    vectorize(){
        let arr = []
        let current = this.head
        while(current!=null){
            arr.push(current.data)
            current=current.next
        }
        return arr
    }
}