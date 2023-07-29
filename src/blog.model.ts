//게시글의 타입을 인터페이스로 정의
export interface PostDto {
    id: string;
    title: string;
    content: string;
    name: string;
    createDt: Date;
    updateDt: Date;
}