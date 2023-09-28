class DaThucHeap {
    constructor() {
        this.heap = [];
    }

    // Thêm một đơn thức
    addDonThuc(bac, heso) {
        this.heap.push({ bac, heso });
        this.heapifyUp(this.heap.length - 1);
    }

    // Hàm để tái cân bằng Heap sau khi thêm một đơn thức
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].bac > this.heap[parentIndex].bac) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    // Hàm để hoán đổi hai phần tử trong Heap
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    addDaThuc(daThuc) {
        for (const { bac, heso } of daThuc.heap) {
            this.addDonThuc(bac, heso);
        }
    }
    
    // Tách kết quả thành mảng các hệ số và bậc
    tachKetqua() {
        const bac_ketqua = [];
        const heso_ketqua = [];

        // Sắp xếp lại Heap theo số mũ giảm dần trước khi tách kết quả
        this.heap.sort((a, b) => b.bac - a.bac);

        for (const { bac, heso } of this.heap) {
            bac_ketqua.push(bac);
            heso_ketqua.push(heso);
        }
        return { bac_ketqua, heso_ketqua };
    }
}

function Heap() {
    let heap1 = new DaThucHeap();
    let heap2 = new DaThucHeap();

    // Thêm các đơn thức vào heap1 và heap2 từ bac_dt1 và heso_dt1, bac_dt2 và heso_dt2

    for (let i = 0; i < bac_dt1.length; i++) {
        heap1.addDonThuc(bac_dt1[i], heso_dt1[i]);
    }

    for (let i = 0; i < bac_dt2.length; i++) {
        heap2.addDonThuc(bac_dt2[i], heso_dt2[i]);
    }

    // Cộng hai đa thức bằng cách thêm heap2 vào heap1
    heap1.addDaThuc(heap2);

    // Tách kết quả từ heap1
    const { bac_ketqua, heso_ketqua } = heap1.tachKetqua();

    // Tạo đa thức kết quả từ mảng bậc và mảng hệ số
    const str_kq = VeDaThuc(bac_ketqua, heso_ketqua, heso_ketqua.length);

    document.getElementById("dathuc_ketqua").innerHTML = str_kq;
}
