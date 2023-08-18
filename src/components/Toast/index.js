const Toast = (props: { 
	message: any, 
	detailedMessage: any
}) => {
  const { message, detailedMessage } = props;

  return (
    <div className="text-white">
		  <div className="font-semibold text-[16px]">{message}</div>
		  <div className="text-[14px]">{detailedMessage}</div>
    </div>
	  );
};

export default Toast;  