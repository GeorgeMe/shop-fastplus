package io.shop.modules.base.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 通用字典表
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
public class SysMacroEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long macroId;
	//父级id
	private Long typeId;
	//名称
	private String name;
	//值
	private String value;
	//状态，0：隐藏   1：显示
	private Integer status;
	//类型,0:目录，1:参数配置
	private Integer type;
	//排序
	private Integer orderNum;
	//备注
	private String remark;
	//创建时间
	private Date createDate;
	//修改时间
	private Date updateDate;
	/**
	 * ztree属性
	 */
	private Boolean open;

	private List<?> list;
	/**
	 * 设置：
	 */
	public void setMacroId(Long macroId) {
		this.macroId = macroId;
	}
	/**
	 * 获取：
	 */
	public Long getMacroId() {
		return macroId;
	}
	/**
	 * 设置：父级id
	 */
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	/**
	 * 获取：父级id
	 */
	public Long getTypeId() {
		return typeId;
	}
	/**
	 * 设置：名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：值
	 */
	public void setValue(String value) {
		this.value = value;
	}
	/**
	 * 获取：值
	 */
	public String getValue() {
		return value;
	}
	/**
	 * 设置：状态，0：隐藏   1：显示
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：状态，0：隐藏   1：显示
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * 设置：类型,0:目录，1:参数配置
	 */
	public void setType(Integer type) {
		this.type = type;
	}
	/**
	 * 获取：类型,0:目录，1:参数配置
	 */
	public Integer getType() {
		return type;
	}
	/**
	 * 设置：排序
	 */
	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}
	/**
	 * 获取：排序
	 */
	public Integer getOrderNum() {
		return orderNum;
	}
	/**
	 * 设置：备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：备注
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateDate() {
		return createDate;
	}
	/**
	 * 设置：修改时间
	 */
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getUpdateDate() {
		return updateDate;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}
}
