import { DepositForm } from './DepositForm';
import { TaxesForm } from './TaxesForm';
import { TradeForm } from './TradeForm';
import { WithdrawalForm } from './WithdrawalForm';

export const EntryForm = ({ type, journal, onClose, entry }) => {
  if (type === 'TRADE') {
    return (
      <TradeForm
        journal={journal}
        onCancel={onClose}
        {...(entry && { trade: entry })}
      />
    );
  } else if (type === 'DEPOSIT') {
    return (
      <DepositForm journal={journal} onCancel={onClose} onSave={onClose} />
    );
  } else if (type === 'WITHDRAWAL') {
    return (
      <WithdrawalForm journal={journal} onCancel={onClose} onSave={onClose} />
    );
  } else {
    return <TaxesForm journal={journal} onCancel={onClose} onSave={onClose} />;
  }
};
