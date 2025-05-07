import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, rowKey, footer }) => {
    return (
        <div className="div-table table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="head-table">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} scope="col">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item[rowKey] || item.id}>
                                {columns.map((column) => (
                                    <td key={`${item[rowKey]}-${column.key}`}>
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
                {footer && (
                    <tfoot>
                        <tr>
                            {footer.map((cell, index) => (
                                <td key={index} className={cell.className || ''}>
                                    {cell.content}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowKey: PropTypes.string.isRequired,
    footer: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.node.isRequired,
            className: PropTypes.string,
        })
    ),
};

Table.defaultProps = {
    rowKey: 'id',
    footer: null,
};

export default Table;