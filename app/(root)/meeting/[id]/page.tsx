const Meeting = ({ params }: { params: { id: string } }) => {
  return <div className="text-white">Meeting Place: #{params.id}</div>;
};

export default Meeting;
