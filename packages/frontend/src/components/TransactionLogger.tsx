import { getExplorerTransactionLink, TransactionStatus } from "@usedapp/core";

interface TransactionLoggerProps {
	tx: TransactionStatus;
	exception?: string;
	success?: string;
	fail?: string;
}

const formatException = (exception: string) => {
	return exception.split(":").slice(1)[0].trim();
};

export default function TransactionLogger({
	tx,
	exception,
	success,
	fail,
}: TransactionLoggerProps) {
	switch (tx.status) {
		case "Mining":
			return (
				<span className="block text-green-500">
					Transaction pending...
					{tx.receipt &&
						"Check it out on " &&
						getExplorerTransactionLink(tx.receipt.transactionHash, tx.chainId)}
					.
				</span>
			);
		case "Success":
			return (
				<span className="block text-green-500">
					{success || "Your transaction has been completed with success."}
				</span>
			);
		case "Fail":
			return (
				<span className="block text-red-500">
					{fail || "Your transaction couldn't be completed with success."}
				</span>
			);
		case "Exception":
			return (
				<span className="block text-red-500">
					{exception || formatException(tx.errorMessage)}
				</span>
			);
		default:
			return null;
	}
}
